# 🫀 HeartGuard AI — Clinical Heart Disease Prediction System

> **HeartGuard AI** is a Machine Learning–powered clinical decision-support web application that predicts the likelihood of heart disease using 11 clinical parameters. The system uses a pre-trained **Logistic Regression** model with a Flask backend and a responsive glassmorphic frontend.

⚠️ **Educational Purpose:** This project is developed for educational, academic, and research demonstration purposes. It is **not a medical diagnostic system** and should not be used as a substitute for professional medical advice.

---

## 📌 Project Overview

Heart disease is one of the major health challenges worldwide. Early identification of potential cardiovascular risk can help healthcare professionals make better-informed decisions.

**HeartGuard AI** demonstrates how Machine Learning can be integrated into a web application to analyze patient information and generate a predicted heart disease risk.

The application accepts clinical parameters such as:

* Patient age
* Biological sex
* Chest pain type
* Resting blood pressure
* Cholesterol
* Fasting blood sugar
* Resting ECG
* Maximum heart rate
* Exercise-induced angina
* ST depression
* ST slope

The trained Logistic Regression model processes these parameters and returns:

* Prediction result
* Heart disease probability
* Risk assessment

---

## ✨ Features

### 🧠 Machine Learning Prediction

* Logistic Regression classification model
* Probability-based prediction
* Real-time prediction through Flask API
* Pre-trained model stored using Python serialization

### 🩺 Clinical Parameters

The application analyzes **11 clinical features**:

| Parameter      | Description                      | Type        |
| -------------- | -------------------------------- | ----------- |
| Age            | Patient age                      | Numerical   |
| Sex            | Biological sex                   | Categorical |
| ChestPainType  | Type of chest pain               | Categorical |
| RestingBP      | Resting blood pressure           | Numerical   |
| Cholesterol    | Serum cholesterol                | Numerical   |
| FastingBS      | Fasting blood sugar > 120 mg/dl  | Categorical |
| RestingECG     | Resting electrocardiogram result | Categorical |
| MaxHR          | Maximum heart rate achieved      | Numerical   |
| ExerciseAngina | Exercise-induced angina          | Categorical |
| Oldpeak        | ST depression                    | Numerical   |
| ST_Slope       | Peak exercise ST segment slope   | Categorical |

### 🎨 Modern User Interface

* Glassmorphism-inspired design
* Responsive layout
* Clean clinical interface
* Dynamic prediction results
* Risk visualization
* Patient form validation
* Sample patient autofill

### ⚡ Easy Local Execution

The application can be run locally using Flask with only a few commands.

### 📡 REST API

The frontend communicates with the Flask backend through:

```text
POST /api/predict
```

The API accepts JSON patient data and returns a prediction response.

---

# 🏗️ System Architecture

HeartGuard AI follows a simple client-server Machine Learning architecture:

```text
┌─────────────────────────────────────────┐
│              User / Patient             │
│                                         │
│        Web Browser / Clinical UI        │
└────────────────────┬────────────────────┘
                     │
                     │ JSON Request
                     ▼
┌─────────────────────────────────────────┐
│             Flask Backend               │
│                                         │
│              app.py / API               │
│                                         │
│  • Input Validation                     │
│  • Feature Processing                   │
│  • Encoder Mapping                      │
│  • Model Prediction                     │
└────────────────────┬────────────────────┘
                     │
                     │ Processed Features
                     ▼
┌─────────────────────────────────────────┐
│        Machine Learning Model            │
│                                         │
│       Logistic Regression Model         │
│                                         │
│          model.pkl                      │
│          encoders.pkl                   │
│          feature_order.pkl              │
└────────────────────┬────────────────────┘
                     │
                     │ Prediction + Probability
                     ▼
┌─────────────────────────────────────────┐
│             Web Interface               │
│                                         │
│       Risk Result / Probability         │
└─────────────────────────────────────────┘
```

---

# 📊 Machine Learning Model

## Algorithm

The project uses:

**Logistic Regression**

Logistic Regression is a supervised Machine Learning classification algorithm commonly used for binary classification problems.

In HeartGuard AI, the model predicts whether the supplied clinical information indicates a higher likelihood of heart disease.

The model produces a probability value between:

```text
0% ───────────────────────────── 100%
```

The probability is then displayed to the user through the application's interface.

---

## 🧮 Input Features

The model uses the following 11 features:

```text
Age
Sex
ChestPainType
RestingBP
Cholesterol
FastingBS
RestingECG
MaxHR
ExerciseAngina
Oldpeak
ST_Slope
```

Categorical variables are processed using pre-fitted encoding objects before being passed to the Machine Learning model.

---

# 🔢 Clinical Feature Dictionary

### 1. Age

Patient's age in years.

```text
Range: 1–120
Type: Numerical
```

---

### 2. Sex

Biological sex.

```text
M = Male
F = Female
```

---

### 3. ChestPainType

Reported chest pain category.

```text
TA   = Typical Angina
ATA  = Atypical Angina
NAP  = Non-Anginal Pain
ASY  = Asymptomatic
```

---

### 4. RestingBP

Resting blood pressure measured in mm Hg.

Example:

```text
120
140
160
```

---

### 5. Cholesterol

Serum cholesterol level measured in mg/dl.

Example:

```text
180
220
289
```

---

### 6. FastingBS

Indicates whether fasting blood sugar is greater than 120 mg/dl.

```text
0 = No
1 = Yes
```

---

### 7. RestingECG

Resting electrocardiogram result.

```text
Normal = Normal ECG
ST     = ST-T wave abnormality
LVH    = Left ventricular hypertrophy
```

---

### 8. MaxHR

Maximum heart rate achieved during exercise.

```text
Typical range: 60–220 bpm
```

---

### 9. ExerciseAngina

Indicates whether exercise causes angina.

```text
N = No
Y = Yes
```

---

### 10. Oldpeak

ST depression induced by exercise relative to rest.

```text
Type: Floating-point number
Example: 0.0, 1.5, 2.4
```

---

### 11. ST_Slope

Slope of the peak exercise ST segment.

```text
Up   = Upsloping
Flat = Flat
Down = Downsloping
```

---

# 📂 Project Structure

```text
HeartGuard-AI/
│
├── api/
│   ├── index.py
│   ├── model.pkl
│   ├── encoders.pkl
│   └── feature_order.pkl
│
├── app.py
│
├── index.html
├── style.css
├── script.js
│
├── requirements.txt
├── DOCUMENTATION.md
├── README.md
└── LICENSE
```

### File Description

| File / Folder           | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `api/index.py`          | Flask API and prediction logic               |
| `api/model.pkl`         | Trained Logistic Regression model            |
| `api/encoders.pkl`      | Saved categorical feature encoders           |
| `api/feature_order.pkl` | Model feature ordering                       |
| `app.py`                | Local Flask application entry point          |
| `index.html`            | Main frontend interface                      |
| `style.css`             | Application styling                          |
| `script.js`             | Frontend logic and API communication         |
| `requirements.txt`      | Python dependencies                          |
| `DOCUMENTATION.md`      | Technical documentation and viva preparation |
| `README.md`             | Project documentation                        |
| `LICENSE`               | Project license                              |

---

# 🛠️ Technologies Used

## Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Responsive Web Design

## Backend

* Python
* Flask
* Flask-CORS

## Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Logistic Regression
* Label Encoding
* Model Serialization

## Development

* Git
* GitHub
* Python Virtual Environment
* VS Code

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/YOUR-USERNAME/HeartGuard-AI.git
```

Move into the project directory:

```bash
cd HeartGuard-AI
```

> Replace `YOUR-USERNAME` with your GitHub username.

---

## 2. Create a Virtual Environment

It is recommended to use a Python virtual environment.

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

If you don't have a `requirements.txt`, the primary dependencies are:

```bash
pip install flask flask-cors pandas numpy scikit-learn joblib
```

---

# ▶️ Running the Application

After installing the dependencies, run:

```bash
python app.py
```

You should see something similar to:

```text
* Running on http://127.0.0.1:5000
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

---

# 🧪 Testing the Application

### Step 1

Open the application in your browser.

### Step 2

Enter the patient's clinical information.

### Step 3

Alternatively, click:

```text
Autofill Sample Patient
```

to populate the form with sample data.

### Step 4

Click:

```text
Generate Prediction Report
```

### Step 5

The application sends the information to the Flask API.

```text
Frontend
   ↓
POST /api/predict
   ↓
Flask Backend
   ↓
Feature Encoding
   ↓
Logistic Regression
   ↓
Prediction Probability
   ↓
Frontend Result
```

---

# 🔌 API Documentation

## POST `/api/predict`

The prediction endpoint accepts patient information in JSON format.

### Request

```http
POST /api/predict
Content-Type: application/json
```

### Request Body

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

### Example Response

```json
{
  "prediction": 1,
  "probability": 95.6,
  "result_text": "Heart Disease Detected"
}
```

---

# 📈 Prediction Output

The application provides a prediction along with a probability score.

Example:

```text
Prediction:
Heart Disease Detected

Probability:
95.6%
```

The frontend visually represents the result using a risk indicator.

> **Important:** The probability generated by the Machine Learning model should not be interpreted as an individual's clinically validated medical risk percentage.

---

# 🔐 Input Validation

HeartGuard AI includes validation for incoming prediction requests.

The backend checks:

* Required fields
* Numerical values
* Categorical values
* Feature names
* Feature ordering
* Model input compatibility
* Invalid or missing JSON data

Invalid requests return structured error responses instead of attempting an invalid prediction.

---

# 🧠 Why Logistic Regression?

Logistic Regression was selected because:

* It is suitable for binary classification.
* It provides probability estimates.
* It is computationally lightweight.
* It works well for structured tabular data.
* It is relatively easy to interpret.
* It is suitable for academic Machine Learning demonstrations.

---

# 🔄 Prediction Workflow

```text
1. User enters patient information
             ↓
2. JavaScript validates the form
             ↓
3. JSON request is created
             ↓
4. Request sent to Flask API
             ↓
5. Flask validates input
             ↓
6. Categorical values are encoded
             ↓
7. Features are arranged in correct order
             ↓
8. Logistic Regression model processes data
             ↓
9. Prediction probability is calculated
             ↓
10. JSON response returned
             ↓
11. Frontend displays the result
```

---

# 📚 Documentation

For detailed technical information, refer to:

```text
DOCUMENTATION.md
```

The documentation includes:

* System architecture
* Machine Learning workflow
* Feature explanation
* API details
* Model explanation
* Project viva questions
* Technical interview questions
* Future improvements

---

# 🎓 Academic Use

HeartGuard AI can be used as a demonstration project for topics such as:

* Machine Learning
* Artificial Intelligence
* Healthcare Analytics
* Python Programming
* Flask Development
* REST APIs
* Classification Algorithms
* Data Preprocessing
* Web Application Development

---

# 🚀 Future Improvements

Possible future improvements include:

* [ ] Add additional Machine Learning algorithms
* [ ] Compare Logistic Regression with Random Forest, SVM, XGBoost, etc.
* [ ] Add model accuracy and evaluation dashboard
* [ ] Add confusion matrix visualization
* [ ] Add ROC-AUC analysis
* [ ] Add patient history management
* [ ] Add database integration
* [ ] Add authentication
* [ ] Add downloadable prediction reports
* [ ] Add doctor/admin dashboard
* [ ] Improve accessibility
* [ ] Add automated model retraining pipeline
* [ ] Add comprehensive unit and integration tests
* [ ] Add Docker support
* [ ] Add production-grade deployment

---

# ⚠️ Medical Disclaimer

**HeartGuard AI is an educational and research demonstration project.**

The predictions generated by this application are based on a Machine Learning model and should **not** be considered a medical diagnosis.

This application:

* Does not replace a qualified doctor.
* Does not provide medical treatment.
* Does not guarantee accurate clinical predictions.
* Should not be used for emergency medical decisions.
* Should not be used as the sole basis for healthcare decisions.

If you have concerns about heart health or experience symptoms such as chest pain, difficulty breathing, fainting, or other serious symptoms, seek appropriate professional medical care.

---

# 🔒 Privacy Notice

This project is intended for demonstration purposes.

Do **not** enter real patient-identifying information into a publicly accessible version of the application.

For academic demonstrations, use:

* Synthetic patient data
* Anonymized datasets
* Publicly available datasets

---

# 📜 License

This project is released under the **MIT License**.

See the `LICENSE` file for more information.

---

# 👨‍💻 Author

**HeartGuard AI**

Machine Learning + Flask + Healthcare Analytics Project

---

# ⭐ Support the Project

If you find this project useful for learning or academic purposes:

⭐ Star the repository on GitHub

🍴 Fork the repository

🐛 Report issues

💡 Suggest improvements

---

## 📌 Quick Start

For experienced users:

```bash
git clone https://github.com/YOUR-USERNAME/HeartGuard-AI.git
cd HeartGuard-AI
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

---

### 🫀 HeartGuard AI

**Machine Learning for educational healthcare innovation.**
