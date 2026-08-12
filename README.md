Heart Disease Predictor
A simple ML-powered web app: Logistic Regression model (trained on the Heart Failure Prediction dataset) served through a Flask API, with a plain HTML/CSS/JS frontend. Deployable on Vercel.

Project structure
heart-app-vercel/
├── api/
│   ├── index.py          # Flask serverless function (prediction API)
│   ├── model.pkl          # trained model (you must add this)
│   ├── encoders.pkl       # label encoders (you must add this)
│   └── feature_order.pkl  # feature column order (you must add this)
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── requirements.txt
├── vercel.json
└── README.md
1. Generate the model files (run locally, once)
Using train_model.py (from the local backend setup) with heart.csv in the same folder:

python train_model.py
This creates model.pkl, encoders.pkl, feature_order.pkl. Copy all three into the api/ folder of this repo.

2. Push to GitHub
git init
git add .
git commit -m "Heart disease predictor - initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
