"""
app.py
------
Local development server launcher for Heart Disease Predictor.
Runs the Flask application on http://127.0.0.1:5000 serving both
the web frontend and the prediction API endpoints.
"""

import sys
import os

# Add project root directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from api.index import app

if __name__ == '__main__':
    print("=" * 60)
    print("  Heart Disease Predictor is running locally!")
    print("  Open your web browser and go to: http://127.0.0.1:5000")
    print("=" * 60)
    app.run(debug=True, host='127.0.0.1', port=5000)
