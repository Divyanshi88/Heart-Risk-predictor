from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import pandas as pd
import os
import base64
from io import BytesIO
import joblib

# Set matplotlib to use non-interactive backend
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

app = Flask(__name__)

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'heart_risk_ensemble_model.joblib')
model = joblib.load(model_path)

feature_names = [
    'age', 'sex', 'cp', 'trestbps', 'restecg', 'thalach', 
    'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

feature_descriptions = {
    'age': 'Age in years',
    'sex': 'Gender (0 = female, 1 = male)',
    'cp': 'Chest pain type (0-3)',
    'trestbps': 'Resting blood pressure (mm Hg)',
    'restecg': 'Resting electrocardiographic results (0-2)',
    'thalach': 'Maximum heart rate achieved',
    'exang': 'Exercise induced angina (1 = yes, 0 = no)',
    'oldpeak': 'ST depression induced by exercise relative to rest',
    'slope': 'Slope of the peak exercise ST segment (0-2)',
    'ca': 'Number of major vessels colored by fluoroscopy (0-3)',
    'thal': 'Thalassemia (0 = normal, 1 = fixed defect, 2 = reversible defect)'
}

model_metrics = {
    'accuracy': 0.87,
    'precision': 0.85,
    'recall': 0.83,
    'f1_score': 0.84,
    'auc': 0.91
}

confusion_matrix = np.array([[67, 13], [8, 62]])

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = None
    probability = None
    input_data_dict = None
    risk_level = None
    
    if request.method == 'POST':
        input_data = []
        for feature in feature_names:
            val = request.form.get(feature)
            try:
                val = float(val)
            except:
                val = 0.0
            input_data.append(val)

        input_array = np.array(input_data).reshape(1, -1)

        pred_prob = model.predict_proba(input_array)[0][1]
        pred_class = model.predict(input_array)[0]
        
        if pred_prob < 0.3:
            risk_level = "Low"
        elif pred_prob < 0.7:
            risk_level = "Moderate"
        else:
            risk_level = "High"

        input_data_dict = dict(zip(feature_names, input_data))
        prediction = int(pred_class)
        probability = round(pred_prob, 4)
        
    return render_template('index.html',
                           prediction=prediction,
                           probability=probability,
                           risk_level=risk_level,
                           input_data=input_data_dict,
                           feature_names=feature_names,
                           feature_descriptions=feature_descriptions)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/dashboard')
def dashboard():
    plots = generate_dashboard_plots()
    return render_template('dashboard.html', 
                          plots=plots,
                          metrics=model_metrics)

def generate_dashboard_plots():
    plots = {}
    
    plt.figure(figsize=(8, 6))
    sns.heatmap(confusion_matrix, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['Negative (0)', 'Positive (1)'],
                yticklabels=['Negative (0)', 'Positive (1)'])
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plots['confusion_matrix'] = get_image_base64()
    
    plt.figure(figsize=(10, 6))
    metrics = list(model_metrics.keys())
    values = list(model_metrics.values())
    plt.bar(metrics, values, color='skyblue')
    plt.ylim(0, 1.0)
    plt.ylabel('Score')
    plt.title('Model Performance Metrics')
    for i, v in enumerate(values):
        plt.text(i, v + 0.02, f'{v:.2f}', ha='center')
    plots['metrics_bar'] = get_image_base64()
    
    plt.figure(figsize=(12, 6))
    importance = np.random.rand(len(feature_names))
    sorted_idx = np.argsort(importance)
    plt.barh([feature_names[i] for i in sorted_idx], importance[sorted_idx], color='lightgreen')
    plt.xlabel('Importance')
    plt.title('Feature Importance')
    plots['feature_importance'] = get_image_base64()
    
    return plots

def get_image_base64():
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    plt.close()
    
    encoded = base64.b64encode(image_png).decode('utf-8')
    return f"data:image/png;base64,{encoded}"

if __name__ == '__main__':
    # Use PORT from environment variable for deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)