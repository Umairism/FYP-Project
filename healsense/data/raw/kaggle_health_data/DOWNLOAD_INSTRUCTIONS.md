# Kaggle Health Datasets

## Setup Instructions

### 1. Install Kaggle CLI
```bash
pip install kaggle
```

### 2. Get Kaggle API Token
1. Go to https://www.kaggle.com/account
2. Click "Create New API Token"
3. Save kaggle.json to ~/.kaggle/ directory
4. Set permissions: chmod 600 ~/.kaggle/kaggle.json

### 3. Download Recommended Datasets

#### Heart Disease Dataset
```bash
kaggle datasets download -d johnsmith88/heart-disease-dataset -p data/raw/kaggle_health_data/
unzip data/raw/kaggle_health_data/heart-disease-dataset.zip -d data/raw/kaggle_health_data/heart_disease/
```

#### Blood Pressure Dataset
```bash
kaggle datasets download -d mrsimple07/blood-pressure-data -p data/raw/kaggle_health_data/
unzip data/raw/kaggle_health_data/blood-pressure-data.zip -d data/raw/kaggle_health_data/blood_pressure/
```

#### Body Temperature Dataset
```bash
kaggle datasets download -d abhinand05/human-body-temperature -p data/raw/kaggle_health_data/
unzip data/raw/kaggle_health_data/human-body-temperature.zip -d data/raw/kaggle_health_data/body_temperature/
```

#### SpO2 and Vital Signs Dataset
```bash
kaggle datasets download -d dhirajnirne/medical-data -p data/raw/kaggle_health_data/
unzip data/raw/kaggle_health_data/medical-data.zip -d data/raw/kaggle_health_data/medical_data/
```

## Alternative Datasets to Explore

- Search "vital signs" on Kaggle
- Search "health monitoring" on Kaggle
- Search "patient data" on Kaggle

## Manual Download
If you prefer manual download:
1. Visit https://www.kaggle.com/datasets
2. Search for the datasets above
3. Download and place in respective folders
