const API_URL = "/api/predict";

const form = document.getElementById('predict-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const spinner = submitBtn.querySelector('.spinner');

const placeholderState = document.getElementById('placeholder-state');
const analysisState = document.getElementById('analysis-state');
const riskCircle = document.getElementById('risk-score-circle');
const riskPercentageEl = document.getElementById('risk-percentage');
const resultBadge = document.getElementById('result-badge');
const progressBarFill = document.getElementById('progress-bar-fill');
const metricsSummary = document.getElementById('metrics-summary');
const fillSampleBtn = document.getElementById('fill-sample-btn');

// Sample patient data for instant testing
const sampleData = {
  Age: 58,
  Sex: "M",
  ChestPainType: "ASY",
  RestingBP: 140,
  Cholesterol: 289,
  FastingBS: "1",
  RestingECG: "Normal",
  MaxHR: 130,
  ExerciseAngina: "Y",
  Oldpeak: 1.5,
  ST_Slope: "Flat"
};

// Fill sample patient data
fillSampleBtn.addEventListener('click', () => {
  for (const [key, val] of Object.entries(sampleData)) {
    const input = document.getElementById(key);
    if (input) {
      input.value = val;
    }
  }
});

// Handle Form Submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    Age: document.getElementById('Age').value,
    Sex: document.getElementById('Sex').value,
    ChestPainType: document.getElementById('ChestPainType').value,
    RestingBP: document.getElementById('RestingBP').value,
    Cholesterol: document.getElementById('Cholesterol').value,
    FastingBS: document.getElementById('FastingBS').value,
    RestingECG: document.getElementById('RestingECG').value,
    MaxHR: document.getElementById('MaxHR').value,
    ExerciseAngina: document.getElementById('ExerciseAngina').value,
    Oldpeak: document.getElementById('Oldpeak').value,
    ST_Slope: document.getElementById('ST_Slope').value
  };

  // Show Loading State
  submitBtn.disabled = true;
  btnText.textContent = "Analyzing Patient Data...";
  spinner.classList.remove('hidden');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.error || "Server returned an invalid response.");
      return;
    }

    renderResults(data, payload);

  } catch (err) {
    showError("Could not reach backend server. Please verify python app.py is running on http://127.0.0.1:5000");
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Generate Prediction Report";
    spinner.classList.add('hidden');
  }
});

function renderResults(data, payload) {
  placeholderState.classList.add('hidden');
  analysisState.classList.remove('hidden');

  const prob = data.probability;
  riskPercentageEl.textContent = `${prob}%`;
  progressBarFill.style.width = `${prob}%`;

  let riskTier = "low";
  let badgeLabel = "✅ Low Risk Detected";
  let circleBorderColor = "#10b981";
  let barColor = "#10b981";
  let summaryText = `Based on the provided metrics (Age ${payload.Age}, Max HR ${payload.MaxHR} bpm), the Machine Learning model predicts a <strong>low probability (${prob}%)</strong> of heart disease.`;

  if (prob >= 60.0 || data.prediction === 1) {
    riskTier = "high";
    badgeLabel = "⚠️ High Risk Detected";
    circleBorderColor = "#ef4444";
    barColor = "#ef4444";
    summaryText = `High risk indicators present (Probability: <strong>${prob}%</strong>). Key potential contributing factors include Chest Pain Type (${payload.ChestPainType}), ST Slope (${payload.ST_Slope}), and Exercise Angina (${payload.ExerciseAngina}). Clinical follow-up recommended.`;
  } else if (prob >= 35.0) {
    riskTier = "moderate";
    badgeLabel = "⚡ Moderate Risk Detected";
    circleBorderColor = "#f59e0b";
    barColor = "#f59e0b";
    summaryText = `Moderate risk level calculated (Probability: <strong>${prob}%</strong>). Regular monitoring of blood pressure (${payload.RestingBP} mm Hg) and cholesterol (${payload.Cholesterol} mg/dl) is recommended.`;
  }

  resultBadge.className = `result-badge ${riskTier}`;
  resultBadge.textContent = badgeLabel;

  riskCircle.style.borderColor = circleBorderColor;
  riskPercentageEl.style.color = circleBorderColor;
  progressBarFill.style.backgroundColor = barColor;

  metricsSummary.innerHTML = summaryText;
}

function showError(message) {
  placeholderState.classList.add('hidden');
  analysisState.classList.remove('hidden');

  resultBadge.className = "result-badge high";
  resultBadge.textContent = "❌ Connection Error";

  riskCircle.style.borderColor = "#ef4444";
  riskPercentageEl.style.color = "#ef4444";
  riskPercentageEl.textContent = "Error";

  progressBarFill.style.width = "0%";
  metricsSummary.innerHTML = `<span style="color:#ef4444;">${message}</span>`;
}
