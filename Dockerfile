FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/

RUN pip install scikit-learn==1.6.1

RUN pip install --default-timeout=100 --no-cache-dir -r requirements.txt

# Copy the model file from the current directory (Heart-Risk-predictor)
COPY heart_risk_ensemble_model.joblib /app/

# Copy all other app files
COPY . /app

EXPOSE 5000

CMD ["python", "app.py"]
