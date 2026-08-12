"""
api/index.py
------------
Vercel serverless entry point & Flask web application.
Serves static frontend files and provides the ML model prediction API.
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))

app = Flask(__name__, static_folder=ROOT_DIR)
CORS(app)

# Load machine learning model and preprocessors
with open(os.path.join(BASE_DIR, 'model.pkl'), 'rb') as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, 'encoders.pkl'), 'rb') as f:
    encoders = pickle.load(f)

with open(os.path.join(BASE_DIR, 'feature_order.pkl'), 'rb') as f:
    feature_order = pickle.load(f)

CATEGORICAL_COLS = ['Sex', 'ChestPainType', 'RestingECG', 'ExerciseAngina', 'ST_Slope']


@app.route('/', methods=['GET'])
def index():
    return send_from_directory(ROOT_DIR, 'index.html')


@app.route('/<path:filename>', methods=['GET'])
def serve_static(filename):
    file_path = os.path.join(ROOT_DIR, filename)
    if os.path.isfile(file_path):
        return send_from_directory(ROOT_DIR, filename)
    return jsonify({"error": f"File '{filename}' not found"}), 404


@app.route('/api', methods=['GET'])
@app.route('/api/', methods=['GET'])
def home():
    return jsonify({"status": "Heart Disease Prediction API is running", "model_version": "1.0"})


@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON input provided."}), 400

        row = {}
        for col in feature_order:
            value = data.get(col)
            if value is None or str(value).strip() == "":
                return jsonify({"error": f"Missing required field: {col}"}), 400

            if col in CATEGORICAL_COLS:
                le = encoders[col]
                str_val = str(value).strip()
                if str_val not in le.classes_:
                    return jsonify({
                        "error": f"Invalid value '{value}' for {col}. Expected one of {list(le.classes_)}"
                    }), 400
                row[col] = le.transform([str_val])[0]
            else:
                try:
                    row[col] = float(value)
                except (ValueError, TypeError):
                    return jsonify({"error": f"Invalid numeric value '{value}' for field '{col}'."}), 400

        input_df = pd.DataFrame([row], columns=feature_order)

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]
        risk_percentage = round(float(probability) * 100, 1)

        result = {
            "prediction": int(prediction),
            "result_text": "Heart Disease Detected" if prediction == 1 else "No Heart Disease Detected",
            "probability": risk_percentage
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("=" * 60)
    print("  Starting Heart Disease Predictor on http://127.0.0.1:5000")
    print("=" * 60)
    app.run(debug=True, host='127.0.0.1', port=5000)
