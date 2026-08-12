# Heart Guard AI — Comprehensive Project Documentation & Viva/Interview Guide

> **Project Name:** Heart Guard AI — Clinical Heart Disease Prediction System  
> **Domain:** Machine Learning & Healthcare Informatics  
> **Tech Stack:** Python 3.x, Flask, scikit-learn, Pandas, NumPy, HTML5, CSS3, JavaScript (ES6+), Vercel  
> **Target Audience:** College Viva Examiners, Practical Project Evaluation, Technical Interviewers

---

## Table of Contents
1. [Abstract & Project Overview](#1-abstract--project-overview)
2. [System Architecture & Data Flow](#2-system-architecture--data-flow)
3. [Machine Learning Pipeline & Clinical Parameters](#3-machine-learning-pipeline--clinical-parameters)
4. [Backend Deep-Dive (`app.py` & `api/index.py`)](#4-backend-deep-dive-apppy--apiindexpy)
5. [Frontend Design & Interactive Engine (`index.html`, `style.css`, `script.js`)](#5-frontend-design--interactive-engine)
6. [Top Viva & Technical Interview Questions (with Expert Answers)](#6-top-viva--technical-interview-questions-with-expert-answers)
7. [Project Setup & Deployment Guide](#7-project-setup--deployment-guide)

---

## 1. Abstract & Project Overview

Cardiovascular Diseases (CVDs) are the leading cause of global mortality. Early detection of heart failure risk allows timely medical intervention. **HeartGuard AI** is a web-based clinical decision support tool that utilizes a supervised Machine Learning model (**Logistic Regression**) trained on patient medical records (such as age, chest pain type, blood pressure, cholesterol, resting ECG, and exercise-induced angina) to predict the probability of heart disease presence.

### Key Objectives
- **Automated Risk Assessment:** Provide instantaneous risk probability (%) and risk categorization (Low, Moderate, High Risk).
- **Stateless Cloud & Local Deployment:** Configured for local WSGI server execution via Flask (`app.py`) as well as serverless cloud deployment via Vercel (`api/index.py`).
- **Interactive UI/UX:** Built with a light clinical aesthetic, responsive layout, sample patient autofill, and visual progress meters.

---

## 2. System Architecture & Data Flow

The system follows a classic **3-Tier Client-Server Architecture**:

```
[ User / Physician ]
        │
        ▼
[ Presentation Layer: index.html / script.js ]  ──(HTTP POST /api/predict)──► [ Application Layer: Flask app.py ]
                                                                                        │
                                                                                        ▼
[ Output: Risk Score & Analysis ] ◄──(JSON: probability, prediction)── [ Intelligence Layer: model.pkl & encoders.pkl ]
```

### Architecture Components
1. **Client Tier (Presentation):** Standard browser rendering `index.html`, styled with `style.css` (custom tokens, flexbox/grid), driven asynchronously by `script.js` using the Fetch API.
2. **Application Tier (Business Logic):** Flask REST API validating payload data, mapping JSON inputs into a structured `pandas.DataFrame` following strict feature ordering.
3. **Intelligence Tier (Machine Learning Model):** Pre-trained `LogisticRegression` estimator and `LabelEncoder` objects unpickled at server startup for real-time inference.

---

## 3. Machine Learning Pipeline & Clinical Parameters

### 3.1 Dataset & Feature Dictionary

The model is trained on 11 core clinical parameters derived from heart disease diagnostic datasets:

| Feature Name | Description | Type | Expected Values / Range |
| :--- | :--- | :--- | :--- |
| `Age` | Age of the patient in years | Numerical | 1 to 120 |
| `Sex` | Biological Sex | Categorical | `M` (Male), `F` (Female) |
| `ChestPainType` | Type of chest pain reported | Categorical | `TA` (Typical Angina), `ATA` (Atypical Angina), `NAP` (Non-Anginal Pain), `ASY` (Asymptomatic) |
| `RestingBP` | Resting blood pressure | Numerical | mm Hg (e.g., 90 - 200) |
| `Cholesterol` | Serum cholesterol level | Numerical | mg/dl (e.g., 100 - 600) |
| `FastingBS` | Fasting blood sugar > 120 mg/dl | Categorical/Binary | `0` (No, <= 120), `1` (Yes, > 120) |
| `RestingECG` | Resting electrocardiographic result | Categorical | `Normal`, `ST` (ST-T wave abnormality), `LVH` (Left Ventricular Hypertrophy) |
| `MaxHR` | Maximum heart rate achieved during stress test | Numerical | bpm (60 - 220) |
| `ExerciseAngina` | Exercise-induced angina | Categorical | `N` (No), `Y` (Yes) |
| `Oldpeak` | ST depression induced by exercise relative to rest | Numerical | mm (float, e.g., 0.0 to 6.2) |
| `ST_Slope` | Slope of the peak exercise ST segment | Categorical | `Up` (Upsloping), `Flat`, `Down` (Downsloping) |

---

### 3.2 Preprocessing & Feature Engineering

Machine learning models require numerical inputs. Categorical text variables are transformed using **scikit-learn LabelEncoder** objects:
- `Sex`: `{'F': 0, 'M': 1}`
- `ChestPainType`: `{'ASY': 0, 'ATA': 1, 'NAP': 2, 'TA': 3}`
- `RestingECG`: `{'LVH': 0, 'Normal': 1, 'ST': 2}`
- `ExerciseAngina`: `{'N': 0, 'Y': 1}`
- `ST_Slope`: `{'Down': 0, 'Flat': 1, 'Up': 2}`

> **Crucial Rule:** The input dataframe columns given to `model.predict()` **must exactly match** the column order defined during model training (`feature_order.pkl`):
> `['Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope']`

---

### 3.3 The Machine Learning Model: Logistic Regression

Logistic Regression is a supervised classification algorithm used to predict binary outcomes (y in {0, 1}).

#### Mathematical Formulation
The linear combination of input features z is computed as:
z = beta_0 + beta_1 * X_1 + beta_2 * X_2 + ... + beta_n * X_n

Where beta_0 is the bias (intercept) and beta_i are the learned feature weights.

The value z is passed through the **Sigmoid (Logit) Activation Function** to map any real-valued number into a probability range (0, 1):
sigma(z) = 1 / (1 + e^(-z)) = P(Y=1 | X)

#### Decision Threshold
- If P(Y=1 | X) >= 0.5 => Class 1 (Heart Disease Detected)
- If P(Y=1 | X) < 0.5 => Class 0 (No Heart Disease Detected)

---

## 4. Backend Deep-Dive (`app.py` & `api/index.py`)

### 4.1 Server Execution Modes
- **Local Development (`app.py`)**: Runs Flask in standalone WSGI mode on `http://127.0.0.1:5000`. Serves both static frontend assets (`index.html`, `style.css`, `script.js`) and API endpoints.
- **Serverless Cloud (`api/index.py`)**: Designed for Vercel. Vercel routes `/api/predict` to `api/index.py` as an isolated Python lambda function.

### 4.2 Endpoint Reference

#### `POST /api/predict`
- **Headers:** `Content-Type: application/json`
- **Request Body Example:**
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
- **Response Body Example (HTTP 200 OK):**
  ```json
  {
    "prediction": 1,
    "probability": 95.6,
    "result_text": "Heart Disease Detected"
  }
  ```

---

## 5. Frontend Design & Interactive Engine

### 5.1 Design System Tokens (`style.css`)
- **Theme:** Clean Light Mode (Slate/White `#ffffff` cards, soft `#f8fafc` background).
- **Typography:** Google Font `'Outfit'`, sans-serif.
- **Color Palette:**
  - Low Risk (< 35%): Emerald Green (`#059669`, background `#ecfdf5`)
  - Moderate Risk (35% - 59%): Amber (`#d97706`, background `#fffbeb`)
  - High Risk (>= 60%): Crimson Rose (`#e11d48`, background `#fff1f2`)

### 5.2 Dynamic Form & Sample Autofill (`script.js`)
- Contains a pre-configured sample patient object allowing one-click testing (`Autofill Sample Patient`).
- Asynchronously submits JSON data using JavaScript `fetch()`.
- Updates DOM elements dynamically (percentage score, progress bar width, border colors, and diagnostic summaries) without reloading the page.

---

## 6. Top Viva & Technical Interview Questions (with Expert Answers)

### Q1: Why did you choose Logistic Regression instead of complex models like Random Forest or Neural Networks?
> **Answer:**  
> 1. **Interpretability & Clinical Safety:** In medical diagnostics, explainability is essential. Logistic Regression provides clear feature weights (odds ratios), allowing doctors to understand why a risk score was assigned.  
> 2. **Dataset Size & Simplicity:** For small to medium tabular datasets (~1,000 samples), complex models like Deep Neural Networks tend to overfit. Logistic Regression provides strong generalization with low computational overhead.  
> 3. **Speed & Efficiency:** Inference requires trivial memory (< 2 MB) and executes in under 1 millisecond.

---

### Q2: What is Model Pickling, and what are its security / compatibility risks?
> **Answer:**  
> Pickling (`pickle` module in Python) serializes a Python object structure into a binary byte stream for saving to disk (`.pkl`).  
> - **Risks:** Pickling is not secure against erroneous or maliciously constructed data. Unpickling untrusted files can execute arbitrary code.  
> - **Version Incompatibility:** If a model is pickled using `scikit-learn 1.6.1` and unpickled in `1.9.0`, a version warning is raised because internal attribute representations may change between releases.

---

### Q3: How do you handle numerical data vs categorical data in your Machine Learning pipeline?
> **Answer:**  
> - **Categorical Features** (e.g. `Sex`, `ST_Slope`): Converted to integer indices using fitted `LabelEncoder` instances before passing to `model.predict()`.  
> - **Numerical Features** (e.g. `Age`, `Cholesterol`): Cast to floating-point numbers (`float(value)`).

---

### Q4: What is the difference between `model.predict()` and `model.predict_proba()`?
> **Answer:**  
> - `model.predict(X)` returns a discrete binary class label (`0` for No Heart Disease, `1` for Heart Disease Detected) based on a 0.5 threshold.  
> - `model.predict_proba(X)` returns continuous class probabilities `[P(Y=0), P(Y=1)]`. The second column `P(Y=1)` gives the probability score (e.g., `0.956` => `95.6%`), which we use for our risk gauge visualization.

---

### Q5: What is CORS and why is `flask-cors` required in your Flask app?
> **Answer:**  
> **Cross-Origin Resource Sharing (CORS)** is a browser security mechanism that blocks web pages from making requests to a different domain/port than the one that served the web page. Adding `CORS(app)` via `flask-cors` sets proper HTTP headers (`Access-Control-Allow-Origin: *`), enabling frontend applications hosted on separate domains/ports to access the API.

---

### Q6: How does the application handle missing or invalid user inputs?
> **Answer:**  
> The backend iterates over expected features in `feature_order`. If a field is missing or empty, it returns an HTTP `400 Bad Request` with `{ "error": "Missing required field: <col>" }`. If a numerical field fails float conversion or a categorical value is not in `encoder.classes_`, a descriptive HTTP 400 error is returned, which the frontend displays gracefully.

---

## 7. Project Setup & Deployment Guide

### Local Running Instructions
1. Open terminal in the project directory:
   ```bash
   cd C:\Users\jayan\Downloads\N\heart-disease-prediction-python-main
   ```
2. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the local application:
   ```bash
   python app.py
   ```
4. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

---

### Vercel Cloud Deployment
1. Initialize Git repository and commit files:
   ```bash
   git init
   git add .
   git commit -m "Heart Disease Predictor - Initial Commit"
   ```
2. Push repository to GitHub.
3. Import repository into Vercel dashboard. Vercel automatically detects `vercel.json` and builds the serverless Python environment.
