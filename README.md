# Heart Risk Prediction Web Application

A Flask-based web application that predicts heart disease risk using machine learning.

## Features

- **Prediction Interface**: Input health parameters and get heart risk predictions
- **Dashboard**: Visualize model performance metrics and insights
- **About Page**: Information about the project and team members

## Project Structure

```
healthcare/
├── app.py                  # Main Flask application
├── heart_risk_ensemble_model.joblib  # Pre-trained ML model
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
├── static/                 # Static files
│   ├── css/                # CSS stylesheets
│   │   └── style.css       # Custom styles
│   ├── js/                 # JavaScript files
│   │   └── main.js         # Custom scripts
│   └── images/             # Image assets
│       ├── divyanshi.jpg   # Team member photo
│       └── yashsi.jpg      # Team member photo
└── templates/              # HTML templates
    ├── index.html          # Home/prediction page
    ├── dashboard.html      # Model performance dashboard
    └── about.html          # About project and team
```

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```
   python app.py
   ```

4. **Access the web application**
   Open your browser and navigate to `http://127.0.0.1:5000/`

## Model Information

The heart risk prediction model is an ensemble model that combines multiple machine learning algorithms to predict the risk of heart disease based on various health parameters.

### Input Features

- **age**: Age in years
- **sex**: Gender (0 = female, 1 = male)
- **cp**: Chest pain type (0-3)
- **trestbps**: Resting blood pressure (mm Hg)
- **chol**: Serum cholesterol (mg/dl)
- **fbs**: Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
- **restecg**: Resting electrocardiographic results (0-2)
- **thalach**: Maximum heart rate achieved
- **exang**: Exercise induced angina (1 = yes, 0 = no)
- **oldpeak**: ST depression induced by exercise relative to rest
- **slope**: Slope of the peak exercise ST segment (0-2)
- **ca**: Number of major vessels colored by fluoroscopy (0-3)
- **thal**: Thalassemia (0 = normal, 1 = fixed defect, 2 = reversible defect)

## Team

- **Divyanshi Sharma** - B.Tech Computer Science (Data Science specialization)
- **Yashsi Shukla** - B.Tech Computer Science (Artificial Intelligence specialization)

## Disclaimer

This application is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.