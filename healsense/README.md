# HealSense Health Monitoring System

## AI-Powered Vital Sign Analysis and Risk Prediction

HealSense is a comprehensive health monitoring platform built to provide continuous analysis of patient vital signs using advanced machine learning. The system classifies health status and generates intelligent alerts based on real-time physiological measurements.

## What the System Does

The core function of HealSense is to monitor vital signs continuously and predict health risks using LSTM (Long Short-Term Memory) deep learning models. The system analyzes five critical vital measurements and classifies them into three health states. This allows healthcare providers to identify potential health risks early and intervene appropriately.

### Health Status Classification

The system classifies health measurements into three states:

**Normal**: All vital measurements are within safe ranges and patient is in good health condition.

**Warning**: One or more vital measurements are approaching critical thresholds, indicating a need for monitoring and potential intervention.

**Critical**: Vital measurements indicate an emergency situation requiring immediate medical attention.

### Monitored Vital Measurements

The system continuously monitors and analyzes five critical health parameters:

1. **Heart Rate (HR)**: Measured in beats per minute. Normal range is 60-100 bpm at rest; extreme values below 40 or above 130 indicate critical concern.

2. **Blood Oxygen Saturation (SpO2)**: Expressed as percentage. Normal range is 95-100%; values below 90% indicate dangerous oxygen deprivation.

3. **Body Temperature**: Measured in Celsius. Normal range is 36.5-37.5°C; values above 38.5°C indicate fever, above 40°C is critical.

4. **Blood Pressure - Systolic**: First (upper) number in blood pressure reading, measured in mmHg. Normal range is 90-120 mmHg; values above 180 or below 90 are concerning.

5. **Respiratory Rate (RR)**: Measured in breaths per minute. Normal range is 12-20; extreme values below 8 or above 30 indicate distress.

## Getting Started

### Prerequisites

Before setting up HealSense, ensure you have the following installed:

- Python 3.9 or higher with pip package manager
- Virtual environment tool (venv or conda)
- Git for version control
- Basic command line proficiency

### Installation Steps

**Step 1: Set up Python environment**

```bash
# Navigate to healsense directory
cd healsense

# Create a virtual environment
python -m venv venv

# Activate the environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

**Step 2: Install dependencies**

```bash
# Install all required Python packages
pip install -r requirements.txt

# This includes: TensorFlow, scikit-learn, pandas, numpy, 
# Jupyter, and other data science libraries
```

### Training the ML Model

The machine learning model requires training on data before it can make predictions. This is done through a three-step process:

**Step 1: Generate training data**

```bash
# Creates 10,000 synthetic vital sign records with realistic distributions
python scripts/generate_synthetic_data.py

# Output location: data/raw/synthetic/synthetic_vital_signs.csv
# This step takes approximately 1-2 minutes
```

Generated data includes realistic vital sign distributions:
- 93% records classified as NORMAL (healthy vitals)
- 5% records classified as WARNING (elevated readings)
- 2% records classified as CRITICAL (emergency thresholds)

**Step 2: Train the LSTM model**

```bash
# Open Jupyter to run the training notebook
jupyter notebook notebooks/02_lstm_health_prediction.ipynb

# Run all cells in the notebook sequentially
# Training typically takes 10-20 minutes on CPU, 5 minutes on GPU
```

The training process performs:
- Exploratory data analysis on vital signs
- Data normalization and preprocessing
- LSTM neural network training (93%+ accuracy expected)
- Model evaluation on test dataset
- Creation of model checkpoints and metadata

**Step 3: Deploy model for mobile**

```bash
# Converts trained model to TensorFlow Lite format for mobile devices
python scripts/deploy_model.py

# Output location: data/models/tflite/health_model.tflite
# Model size: less than 5 MB (suitable for mobile deployment)
```

### Running Applications

**Start Mobile App**

```bash
cd frontend/mobile-app
npm install
npx expo start

# For testing, use demo credentials:
# Email: umair@healsense.com
# Password: password123
```

**Start Web Dashboard**

```bash
cd frontend/web-app
npm install
npm run dev

# Access at http://localhost:5173
# Use same demo credentials
```

## Project Structure

```
healsense/
├── data/                                    # Data storage directory
│   ├── raw/                                 # Raw source datasets
│   │   ├── synthetic/                       # Generated training data
│   │   │   └── synthetic_vital_signs.csv   # 10,000 records
│   │   ├── uci_heart_disease/              # UCI ML Repository dataset
│   │   │   └── heart-disease.names         # Feature descriptions
│   │   ├── physionet_bidmc/                # PhysioNet BIDMC database
│   │   │   └── download_bidmc.py           # Download script
│   │   └── kaggle_health_data/             # Kaggle public datasets
│   │       ├── LICENSE                     # Dataset licensing
│   │       └── Codes/                      # Related code files
│   │
│   ├── models/                              # Machine learning models
│   │   ├── checkpoints/                     # Training checkpoints
│   │   │   └── best_model.h5               # Best performing model
│   │   ├── metadata/                        # Preprocessing and metadata
│   │   │   ├── scaler.pkl                  # Feature scaling parameters
│   │   │   ├── model_info.json             # Model architecture details
│   │   │   └── training_history.json       # Training metrics
│   │   └── tflite/                          # Mobile-optimized models
│   │       ├── health_model.tflite         # Float16 quantized model
│   │       └── health_model_int8.tflite    # Int8 quantized model
│   │
│   └── processed/                           # Processed intermediate datasets
│
├── notebooks/                               # Jupyter research notebooks
│   ├── 01_data_exploration.ipynb           # Data analysis and visualization
│   │   (Exploratory Data Analysis)
│   │   - Dataset overview and statistics
│   │   - Feature distribution plots
│   │   - Correlation analysis
│   │   - Data quality assessment
│   │
│   └── 02_lstm_health_prediction.ipynb     # Main training notebook
│       (Model Development)
│       - Data loading and preprocessing
│       - LSTM model definition
│       - Model training and validation
│       - Performance evaluation
│       - Model export
│
├── scripts/                                 # Python utility scripts
│   ├── generate_synthetic_data.py          # Synthetic data generation
│   │   (Creates realistic vital sign records with health classifications)
│   ├── deploy_model.py                     # Model deployment utility
│   │   (Converts model to TFLite for mobile deployment)
│   ├── download_datasets.py                # Dataset downloader
│   │   (Fetches UCI, PhysioNet, Kaggle datasets)
│   ├── download_kaggle.py                  # Kaggle API integration
│   ├── analyze_datasets.py                 # Data analysis utility
│   │   (Statistical analysis and visualization)
│   └── auto_download.py                    # Automated parallel downloads
│
├── backend/                                 # FastAPI REST API server
│   ├── api/                                # Main API implementation
│   ├── alembic/                            # Database migrations
│   ├── requirements.txt                    # Python dependencies
│   ├── run.py                              # Development server
│   └── README.md                           # Backend documentation
│
├── frontend/                                # User interface applications
│   ├── mobile-app/                         # Flutter mobile application
│   │   ├── lib/                            # Dart/Flutter source
│   │   ├── pubspec.yaml                    # Dependencies
│   │   └── README.md                       # Mobile app docs
│   │
│   └── web-app/                            # React web dashboard
│       ├── src/                            # React components
│       ├── package.json                    # Node dependencies
│       └── README.md                       # Web dashboard docs
│
├── docs/                                    # Project documentation
│   └── diagrams/                           # Architecture and flow diagrams
│       ├── healsense_architecture.puml     # System architecture
│       ├── ml_pipeline.puml                # Machine learning workflow
│       ├── data_flow.puml                  # Data processing flow
│       ├── database_architecture.puml      # Database schema
│       ├── alert_system.puml               # Alert generation flow
│       └── deployment_workflow.puml        # Deployment process
│
├── requirements.txt                         # Python dependencies (ML/utils)
├── test_phone_integration.py               # Phone sensor tests
└── Google_Colab_Setup.ipynb                # Google Colab configuration
```

## Core Technologies

**Backend Framework**: FastAPI (Python) - Modern, fast REST API framework

**Database**: PostgreSQL - Relational database for structured health data

**Machine Learning**: TensorFlow 2.x with Keras - Deep learning model training

**Data Processing**: pandas, numpy, scikit-learn - Data manipulation and preprocessing

**Visualization**: matplotlib, seaborn - Data exploration and analysis

**Notebook Environment**: Jupyter - Interactive experimentation and development

**Frontend**: Flutter (mobile) and React (web) - User interface platforms

## Key Features

**LSTM-Based Predictions**: Uses Long Short-Term Memory neural networks to detect patterns in vital sign sequences over time, enabling accurate health state classification.

**Multiple Data Sources**: Supports data from IoT sensors, mobile phone sensors, wearable devices, and manual entry, all processed through the same analysis pipeline.

**Real-Time Processing**: Analyzes vital signs as they arrive and generates alerts based on ML predictions and clinical thresholds.

**Model Versioning**: Trained models are saved as checkpoints with metadata, allowing for version control and model rollback.

**Mobile Optimization**: Models are converted to TensorFlow Lite format for deployment on mobile devices with minimal resource consumption.

## Running Individual Components

**Data Exploration Only**

```bash
# Opens the data exploration notebook
jupyter notebook notebooks/01_data_exploration.ipynb
```

**Training and Evaluation**

```bash
# Opens the main training notebook
jupyter notebook notebooks/02_lstm_health_prediction.ipynb
```

**Generate New Synthetic Data**

```bash
python scripts/generate_synthetic_data.py
```

## Testing and Validation

Test scripts are included to verify system functionality:

**Test phone sensor integration**

```bash
python test_phone_integration.py
```

This tests the capability to read and process sensor data from mobile devices.

## Performance Benchmarks

**Model Training**:
- Training time: 10-20 minutes on CPU, 5 minutes on GPU
- Convergence typically achieved within 50-100 epochs
- Early stopping prevents overfitting

**Model Performance**:
- Overall accuracy: 93%+ on test data
- Precision and recall metrics per health classification
- Inference latency: 5-10ms on standard hardware

**Deployment**:
- TFLite model size: 4-5 MB
- Mobile inference time: 15-25ms on mobile devices
- Battery impact: Minimal when run periodically

## Troubleshooting

**TensorFlow Installation Issues**: If TensorFlow fails to install, try installing a compatible version manually or using conda instead of pip.

**Memory Issues During Training**: Reduce batch size in the training notebook or reduce dataset size for testing.

**Model Import Errors**: Ensure all dependencies are properly installed and versions match those in requirements.txt.

**Data Generation Failing**: Verify write permissions to the data/ directory and adequate disk space.

## Next Steps

1. Run data exploration notebook to understand the datasets
2. Generate synthetic training data
3. Train the LSTM model on your hardware
4. Deploy the model to mobile using the deploy script
5. Connect frontend applications to backend API
6. Test end-to-end system with mobile and web apps

## Documentation

Comprehensive documentation is available in the PROJECT_COMPREHENSIVE_DOCUMENTATION.md file at the project root, including:
- Detailed system architecture
- Complete API reference
- Database schema documentation
- Deployment procedures
- Development guidelines

## Project Status

Version: 1.0  
Last Updated: April 2026  
Status: Production-Ready
│   ├── deploy_model.py              # TFLite conversion & benchmarking
│   ├── download_datasets.py         # Dataset downloaders
│   └── analyze_datasets.py          # Data analysis utilities
│
├── frontend/
│   ├── mobile-app/                   # React Native + Expo
│   │   ├── src/
│   │   │   ├── components/          # UI components (VitalCard, AlertBanner)
│   │   │   ├── screens/             # App screens (Dashboard, Alerts, Profile)
│   │   │   ├── contexts/            # AuthContext, DarkModeContext
│   │   │   ├── hooks/               # useVitals, usePatient, useWebSocket
│   │   │   └── types/               # TypeScript definitions
│   │   └── package.json
│   │
│   └── web-app/                      # React + Vite + Shadcn UI
│       ├── src/
│       │   ├── components/          # Shadcn UI components
│       │   ├── pages/               # Dashboard, NotFound
│       │   ├── hooks/               # Custom React hooks
│       │   └── lib/                 # API client & utilities
│       └── package.json
│
├── backend/                          # Backend API (in development)
│   └── .env.example
│
├── docs/                             # Documentation
│   └── diagrams/                    # PlantUML architecture diagrams
│
├── requirements.txt                  # Python dependencies
├── README.md                        # This file
├── SETUP.md                         # Detailed setup instructions
├── TODO.md                          # 18-week development roadmap
└── MODEL_SUMMARY.md                 # Model architecture & performance
```

## 🧠 Machine Learning Model

### Architecture

```python
Model: LSTM Health Risk Classifier
_________________________________________________________________
Layer (type)                Output Shape              Params
=================================================================
LSTM (128 units)           (None, 60, 128)           68,608
Dropout (0.3)              (None, 60, 128)           0
LSTM (64 units)            (None, 64)                49,408
Dropout (0.2)              (None, 64)                0
Dense (32 units)           (None, 32)                2,080
Dropout (0.1)              (None, 32)                0
Dense (3 units, softmax)   (None, 3)                 99
=================================================================
Total params: 120,195
Trainable params: 120,195
Non-trainable params: 0
_________________________________________________________________
```

### Input Format

- **Shape**: `(batch_size, 60, 5)`
- **60 timesteps**: 5-minute history at 5-second intervals
- **5 features**: [HR, SpO₂, Temperature, Systolic BP, Respiratory Rate]
- **Normalization**: StandardScaler (mean=0, std=1)

### Output

- **Shape**: `(batch_size, 3)`
- **Classes**: `[Normal, Warning, Critical]`
- **Activation**: Softmax (probability distribution)

### Performance Metrics

| Metric              | Value   | Target  |
|---------------------|---------|--------|
| Overall Accuracy    | 93.2%   | >90%   |
| Normal F1-Score     | 0.95    | >0.90  |
| Warning F1-Score    | 0.89    | >0.85  |
| Critical F1-Score   | 0.91    | >0.85  |
| **Critical Recall** | **96.8%** | **>95%** |
| Model Size (TFLite) | 4.2 MB  | <5 MB  |
| Inference Time      | 78 ms   | <100ms |

### Training Configuration

- **Optimizer**: Adam (lr=0.001)
- **Loss**: Categorical Crossentropy
- **Class Weights**: {Normal: 0.5, Warning: 2.5, Critical: 8.0}
- **Callbacks**:
  - EarlyStopping (patience=15, restore_best_weights)
  - ReduceLROnPlateau (factor=0.5, patience=5)
  - ModelCheckpoint (save_best_only)
- **Epochs**: 100 (with early stopping)
- **Batch Size**: 32
- **Validation Split**: 20%

### Model Features

✅ **StandardScaler Normalization**: Handles different vital sign scales  
✅ **Class Imbalance Handling**: Weighted loss for rare critical cases  
✅ **Dropout Regularization**: Prevents overfitting (0.3, 0.2, 0.1)  
✅ **Early Stopping**: Stops training when validation loss plateaus  
✅ **TFLite Optimization**: Float16 quantization for mobile  
✅ **Comprehensive Evaluation**: Confusion matrix, ROC curves, per-class metrics  

## 📊 Datasets

### Synthetic Data (Primary)

- **Records**: 10,000 vital sign sequences
- **Patients**: 10 simulated patients
- **Class Distribution**: 80% Normal, 16% Warning, 5% Critical
- **Features**: Realistic vital sign ranges with clinical thresholds
- **Generation**: `scripts/generate_synthetic_data.py`

### Real-World Datasets

1. **UCI Heart Disease**: 303 patients, 14 features
2. **PhysioNet BIDMC**: ICU patient respiratory/vital signs
3. **Kaggle Health Data**: Various cardiovascular datasets

## 📱 Mobile Application

### Features

- ✅ Real-time vital signs monitoring
- ✅ Color-coded health status indicators
- ✅ Smart alert system with acknowledgment
- ✅ User authentication & profile management
- ✅ Emergency contacts (Doctor & Family)
- ✅ One-tap emergency button
- ✅ WhatsApp integration for alerts
- ✅ Dark mode support
- ✅ Offline-first architecture

### Tech Stack

- **Framework**: React Native 0.81.5 + Expo 54
- **Language**: TypeScript 5.3.3
- **Navigation**: React Navigation 6.x
- **State**: React Query + Context API
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons

### Demo Account

```
Email: umair@healsense.com
Password: password123

Patient: Umair Hakeem, 24, Blood Type O+
Emergency Contacts:
  - Doctor: Dr. Ahmed Khan
  - Family: Awais (Brother)
```

## 🌐 Web Dashboard

### Features

- ✅ Modern, responsive UI with Shadcn components
- ✅ Real-time data visualization
- ✅ Patient monitoring dashboard
- ✅ Dark mode support
- ✅ Fast development with Vite HMR

### Tech Stack

- **Framework**: React 19 + Vite
- **UI**: Shadcn UI + Radix UI + Tailwind CSS
- **Language**: TypeScript
- **State**: React Query
- **Routing**: React Router

## 🛠️ Tech Stack Summary

### Machine Learning
- TensorFlow 2.x / Keras
- scikit-learn
- NumPy, Pandas
- Matplotlib, Seaborn

### Mobile Development
- React Native 0.81.5
- Expo 54
- TypeScript 5.3.3
- TensorFlow Lite

### Web Development
- React 19
- Vite
- Shadcn UI
- Tailwind CSS

### Backend (Planned)
- FastAPI / Flask
- PostgreSQL / Firebase
- Redis
- WebSockets

### IoT Hardware (Planned)
- Arduino Uno/Mega
- MAX30102 (HR/SpO₂)
- MLX90614 (Temperature)
- BMP180 (Blood Pressure)
- ESP32 (WiFi)

## 📈 Development Roadmap

See [TODO.md](TODO.md) for the complete 18-week development plan.

### Current Status (January 2026)

✅ **Phase 1**: Data Collection & Preprocessing  
✅ **Phase 2**: ML Model Development  
✅ **Phase 3**: Frontend Development (Mobile & Web)  
🚧 **Phase 4**: Backend API Development (In Progress)  
⏳ **Phase 5**: Hardware Integration (Upcoming)  
⏳ **Phase 6**: Deployment & Testing (Upcoming)  

## 🧪 Testing

### Model Testing

```bash
# Run model evaluation cells in notebook
jupyter notebook notebooks/02_lstm_health_prediction.ipynb
```

### Mobile App Testing

```bash
cd frontend/mobile-app
npm test
npm run lint
```

### Web App Testing

```bash
cd frontend/web-app
npm test
npm run lint
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)**: Detailed installation guide
- **[MODEL_SUMMARY.md](MODEL_SUMMARY.md)**: Complete model documentation
- **[TODO.md](TODO.md)**: Full development roadmap
- **[CONSTRUCTION.md](../CONSTRUCTION.md)**: System architecture guide
- **[mobile-app/README.md](frontend/mobile-app/README.md)**: Mobile app documentation

## 🤝 Contributing

This is a Final Year Project (FYP). Suggestions and feedback are welcome!

## 📄 License

Academic Final Year Project

## 👨‍💻 Author

- **Umair Hakeem**
- **Mahnoor Sadaqat**
- **Raj Bibi**

## 🙏 Acknowledgments

- UCI Machine Learning Repository
- PhysioNet
- Kaggle community
- TensorFlow & React Native teams

---

**Project Start**: November 1, 2025  
**Last Updated**: January 21, 2026  
**Version**: 0.1.0  
**Status**: Active Development
