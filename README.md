# 🫀 HeartGuard AI — Clinical Heart Disease Prediction System

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/framework-Flask-black.svg)](https://flask.palletsprojects.com/)
[![ML Library](https://img.shields.io/badge/ML-scikit--learn-orange.svg)](https://scikit-learn.org/)
[![Deployment](https://img.shields.io/badge/deployed%20on-Vercel-000000.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **HeartGuard AI** is a lightweight, high-precision clinical decision support web application powered by Machine Learning. It predicts patient heart disease probability in real-time based on 11 key clinical parameters, featuring a modern glassmorphic interface and dual execution architecture (local WSGI + serverless cloud deployment).

---

## 📸 Overview & Features

- **⚡ Real-Time ML Predictions:** Evaluates cardiovascular risk using a pre-trained **Logistic Regression** model and outputs continuous probability scores ($0.0\% - 100.0\%$).
- **🎨 Glassmorphic Clinical UI:** Clean, responsive user interface built with HTML5, CSS3, and JavaScript, with visual risk meters (Low, Moderate, High Risk) and custom color coding.
- **🧪 One-Click Sample Autofill:** Includes pre-loaded sample clinical data for instant evaluation and testing.
- **🚀 Serverless & Local Ready:** Dual backend setup via standalone Flask (`app.py`) for local development and Vercel serverless lambdas (`api/index.py`).
- **🛡️ Robust Input Validation:** Full feature encoding handling via `LabelEncoder` objects and strict data validation returning structured HTTP error responses.
- **📚 Viva & Academic Documentation:** Complete architectural breakdown, feature dictionaries, and technical interview Q&A included in [`DOCUMENTATION.md`](DOCUMENTATION.md).

---

## 🏗️ Architecture & Data Flow

HeartGuard AI follows a 3-tier client-server architecture:

```
┌────────────────────────────────┐
│      User / Physician UI       │
│  (index.html / script.js / CSS) │
└───────────────┬────────────────┘
                │ HTTP POST /api/predict (JSON)
                ▼
┌────────────────────────────────┐
│     Flask Application API      │
│   (app.py / api/index.py)      │
└───────────────┬────────────────┘
                │ Feature Mapping & Preprocessing
                ▼
┌────────────────────────────────┐
│    Machine Learning Engine     │
│  (model.pkl & encoders.pkl)    │
└────────────────────────────────┘
```

---

## 📊 Machine Learning & Clinical Parameters

The model evaluates **11 clinical indicators** to calculate the risk score:

| Parameter | Clinical Name | Type | Options / Range |
| :--- | :--- | :--- | :--- |
| **Age** | Patient Age | Numerical | 1 - 120 years |
| **Sex** | Biological Sex | Categorical | `M` (Male), `F` (Female) |
| **ChestPainType** | Reported Chest Pain Type | Categorical | `TA` (Typical Angina), `ATA` (Atypical Angina), `NAP` (Non-Anginal Pain), `ASY` (Asymptomatic) |
| **RestingBP** | Resting Blood Pressure | Numerical | mm Hg (e.g. 90 - 200) |
| **Cholesterol** | Serum Cholesterol | Numerical | mg/dl (e.g. 100 - 600) |
| **FastingBS** | Fasting Blood Sugar > 120 mg/dl | Categorical | `0` (No), `1` (Yes) |
| **RestingECG** | Resting ECG Result | Categorical | `Normal`, `ST` (ST-T Abnormality), `LVH` (Left Ventricular Hypertrophy) |
| **MaxHR** | Max Heart Rate Achieved | Numerical | bpm (60 - 220) |
| **ExerciseAngina** | Exercise-Induced Angina | Categorical | `N` (No), `Y` (Yes) |
| **Oldpeak** | ST Depression (Exercise vs Rest) | Numerical | Float (e.g. 0.0 - 6.2) |
| **ST_Slope** | Peak Exercise ST Segment Slope | Categorical | `Up` (Upsloping), `Flat`, `Down` (Downsloping) |

---

## 📂 Project Structure

```
D:\HDP\
├── api/
│   ├── index.py          # Flask backend & Vercel serverless function entrypoint
│   ├── model.pkl         # Serialized Logistic Regression model
│   ├── encoders.pkl      # Pre-fitted scikit-learn LabelEncoders
│   └── feature_order.pkl # Strict column order mapping for model input
├── app.py                # Local WSGI development server runner
├── index.html            # Main web application UI
├── style.css             # Glassmorphic styling & responsive design tokens
├── script.js             # Form handling, asynchronous fetch calls & dynamic UI updates
├── requirements.txt      # Python dependencies (Flask, pandas, scikit-learn, etc.)
├── vercel.json           # Vercel serverless route rewrites
├── DOCUMENTATION.md      # Comprehensive technical guide & viva Q&A
└── README.md             # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
Ensure you have **Python 3.8+** installed on your system.

### 2. Install Dependencies
Clone or download this repository, open your terminal in the project root directory, and install requirements:
```bash
pip install -r requirements.txt
```

### 3. Launch Development Server
Run the local application server:
```bash
python app.py
```

### 4. Access Application
Open your web browser and go to:
```
http://127.0.0.1:5000
```
- Click **"Autofill Sample Patient"** to test with pre-configured clinical values.
- Click **"Generate Prediction Report"** to receive instantaneous risk analysis.

---

## 🔌 API Documentation

### `POST /api/predict`
Calculates heart disease prediction and probability score.

#### Request Headers
`Content-Type: application/json`

#### Sample Request Body
```json
{
  "Age": 58,
  "Sex": "M",
  "ChestPainType": "ASY",
  "RestingBP": 140,
  "Cholesterol": 289,
  "FastingBS": "1",
  "RestingECG": "Normal",
  "MaxHR": 130,
  "ExerciseAngina": "Y",
  "Oldpeak": 1.5,
  "ST_Slope": "Flat"
}
```

#### Sample Success Response (`HTTP 200 OK`)
```json
{
  "prediction": 1,
  "probability": 95.6,
  "result_text": "Heart Disease Detected"
}
```

---

## 🌐 Deploying to Vercel

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Deploy HeartGuard AI to Vercel"
   ```
2. Push your repository to GitHub.
3. Go to [Vercel Dashboard](https://vercel.com), click **Add New → Project**, and import your repository.
4. Vercel automatically detects `vercel.json` and builds the Python serverless environment.
5. Click **Deploy**.

---

## 🩺 Medical Disclaimer

*HeartGuard AI is developed strictly for educational, research, and decision-support demonstration purposes. It is not intended to replace professional medical diagnosis, advice, or treatment.*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
