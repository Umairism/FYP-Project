# 🩺 HealSense

**AI-Powered Health Monitoring & Risk Prediction System**

## 🎯 What It Does

HealSense uses LSTM deep learning to predict health risks from real-time vital signs. The system monitors **5 critical health metrics** and classifies health status into:

- 🟢 **Normal**: All vitals within safe ranges
- 🟡 **Warning**: One or more vitals approaching critical thresholds  
- 🔴 **Critical**: Immediate medical attention required

### Monitored Vital Signs

1. **Heart Rate (HR)**: 40-200 bpm
2. **Blood Oxygen (SpO₂)**: 70-100%
3. **Body Temperature**: 35-42°C
4. **Blood Pressure (Systolic)**: 80-200 mmHg
5. **Respiratory Rate (RR)**: 8-40 breaths/min

## 🚀 Quick Start

### Installation

```bash
# Navigate to project directory
cd healsense

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Training Pipeline

```bash
# Step 1: Generate synthetic training data (10,000 records)
python scripts/generate_synthetic_data.py
# Output: data/raw/synthetic/synthetic_vital_signs.csv

# Step 2: Train LSTM model
jupyter notebook notebooks/02_lstm_health_prediction.ipynb
# Run all cells to train and evaluate
# Training time: ~10-20 minutes (CPU), ~5 minutes (GPU)

# Step 3: Deploy TFLite model for mobile
python scripts/deploy_model.py
# Output: data/models/tflite/health_model.tflite
```

### Run Mobile App

```bash
cd frontend/mobile-app
npm install
npx expo start

# Use demo account:
# Email: umair@healsense.com
# Password: password123
```

### Run Web Dashboard

```bash
cd frontend/web-app
npm install
npm run dev
# Open http://localhost:5173
```

## 📁 Project Structure

```
healsense/
├── data/
│   ├── raw/                          # Raw datasets
│   │   ├── synthetic/                # Generated training data
│   │   ├── uci_heart_disease/        # UCI ML Repository dataset
│   │   ├── physionet_bidmc/          # PhysioNet BIDMC dataset
│   │   └── kaggle_health_data/       # Kaggle datasets
│   └── models/                       # Trained models
│       ├── checkpoints/              # Training checkpoints (.h5, .keras)
│       ├── metadata/                 # Scalers & preprocessing
│       └── tflite/                   # Mobile-optimized models
│
├── notebooks/                        # Jupyter notebooks
│   ├── 01_data_exploration.ipynb     # EDA and data analysis
│   └── 02_lstm_health_prediction.ipynb  # Main training notebook
│
├── scripts/                          # Python utilities
│   ├── generate_synthetic_data.py    # Data generation with clinical thresholds
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

**Umair Hakeem**

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
