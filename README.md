# HealSense Project

## Deep Learning-Based Health Surveillance and Prediction System

HealSense is a comprehensive health monitoring platform that combines machine learning, IoT sensors, and user-friendly applications to provide real-time health risk prediction and monitoring. The system uses LSTM deep learning models to analyze vital signs and deliver intelligent health insights to both patients and healthcare providers.

## Overview

This project aims to solve the critical challenge of continuous remote patient health monitoring by providing an integrated ecosystem that collects vital signs from multiple sources, processes them through AI models, and delivers actionable insights through mobile and web interfaces.

### Core Capabilities

**AI-Powered Health Analysis**: LSTM neural network model trained on real-world medical datasets with over 93% accuracy in classifying health status into Normal, Warning, and Critical states.

**Multi-Platform Application**: Native mobile app built with Flutter for iOS and Android devices, combined with a modern web dashboard using React and Vite for healthcare providers and family members.

**Real-Time Monitoring**: WebSocket-based real-time streaming of vital sign data ensures instant visibility into patient health status across all connected devices.

**Intelligent Alerting**: Automatic alert generation based on ML predictions and configurable thresholds, with multi-level severity classification and provider acknowledgment workflows.

**Cross-Device Integration**: Support for IoT hardware sensors, mobile phone sensors, wearable devices, and manual data entry, all converging into a unified health data platform.

**Production-Ready Deployment**: Mobile-optimized TensorFlow Lite models smaller than 5MB, scalable FastAPI backend with database replication, and multiple deployment options.

### Technical Stack

**Backend**: FastAPI with Python, PostgreSQL for data persistence, Redis for caching, and real-time WebSocket streaming.

**Frontend**: Flutter for mobile (iOS/Android), React 18 with Vite for web dashboard, TypeScript for type safety.

**Machine Learning**: TensorFlow for model training, scikit-learn for data preprocessing, Jupyter for notebook-based analysis.

**Deployment**: Docker containerization, Gunicorn for production serving, support for AWS, Heroku, and traditional VPS infrastructure.

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:

- Python 3.10 or higher
- Node.js 16 or higher
- Git for version control
- Virtual environment tool (venv or conda)

### System Setup

**Step 1: Clone and navigate to the project**

```bash
git clone <repository-url>
cd HealSense
```

**Step 2: Set up Python environment**

```bash
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r healsense/requirements.txt
```

**Step 3: Set up backend**

```bash
cd healsense/backend
pip install -r requirements.txt
cp .env.example .env
python init_db.py
python run.py
```

Backend will be available at http://localhost:5000

**Step 4: Set up web dashboard**

```bash
cd healsense/frontend/web-app
npm install
npm run dev
```

Dashboard will be available at http://localhost:8080

**Step 5: Set up mobile app**

```bash
cd healsense/frontend/mobile-app
flutter pub get
flutter run
```

### Quick Demo

**Backend API**: http://localhost:5000/api/docs

**Web Dashboard**: http://localhost:8080 (Demo account: umair@healsense.com / password123)

**Mobile App**: Run with `flutter run`

## Project Structure

The project is organized into several main components:

```
healsense/
├── backend/                           # FastAPI REST API server
│   ├── api/                          # FastAPI application code
│   │   ├── routes/                   # API endpoint handlers
│   │   ├── models/                   # Data models and schemas
│   │   ├── services/                 # Business logic
│   │   └── middleware/               # Request processing
│   ├── alembic/                      # Database migrations
│   ├── run.py                        # Development server
│   └── requirements.txt              # Python dependencies
│
├── data/                             # Data and models directory
│   ├── raw/                          # Raw datasets
│   │   ├── uci_heart_disease/        # UCI ML Repository data
│   │   ├── physionet_bidmc/          # PhysioNet BIDMC database
│   │   ├── kaggle_health_data/       # Kaggle datasets
│   │   └── synthetic/                # Generated training data
│   ├── models/                       # Machine learning models
│   │   ├── checkpoints/              # Training snapshots
│   │   ├── metadata/                 # Preprocessing metadata
│   │   └── tflite/                   # Mobile-optimized models
│   └── processed/                    # Processed datasets
│
├── notebooks/                        # Jupyter research notebooks
│   ├── 01_data_exploration.ipynb     # Exploratory data analysis
│   └── 02_lstm_health_prediction.ipynb  # Model training
│
├── scripts/                          # Utility and automation scripts
│   ├── generate_synthetic_data.py    # Data generation
│   ├── deploy_model.py               # Model deployment for mobile
│   ├── download_datasets.py          # Dataset acquisition
│   └── analyze_datasets.py           # Data analysis utilities
│
├── frontend/
│   ├── mobile-app/                   # Flutter mobile application
│   │   ├── lib/                      # Dart/Flutter source code
│   │   ├── android/                  # Android configuration
│   │   ├── ios/                      # iOS configuration
│   │   └── pubspec.yaml              # Dart dependencies
│   │
│   └── web-app/                      # React web dashboard
│       ├── src/                      # React components and pages
│       ├── public/                   # Static assets
│       ├── package.json              # Node dependencies
│       ├── vite.config.ts            # Build configuration
│       └── tsconfig.json             # TypeScript configuration
│
├── docs/                             # Project documentation
│   └── diagrams/                     # Architecture diagrams
│
├── PROJECT_COMPREHENSIVE_DOCUMENTATION.md  # Complete reference guide
└── README.md                         # This file
```

## Component Details

### Backend Service

The backend is a FastAPI application providing a REST API for all client applications. It handles patient data management, vital sign ingestion, ML-based risk prediction, alert generation, and real-time WebSocket streaming.

For detailed backend information, see [healsense/backend/README.md](healsense/backend/README.md)

### Mobile Application

The Flutter mobile app provides patients and family members with real-time access to health monitoring capabilities. Features include vital sign visualization, alert notifications, device management, and personal health history tracking.

For mobile app details, see [healsense/frontend/mobile-app/README.md](healsense/frontend/mobile-app/README.md)

### Web Dashboard

The web dashboard is designed for healthcare providers to monitor multiple patients, track health trends, manage alerts, and generate health reports. Built with React and modern web technologies for a responsive, accessible experience.

For web dashboard details, see [healsense/frontend/web-app/README.md](healsense/frontend/web-app/README.md)

### Machine Learning Pipeline

The ML component handles data preparation, model training, evaluation, and deployment. It includes Jupyter notebooks for experimentation and scripts for automated workflows.

For ML pipeline details, see [healsense/README.md](healsense/README.md)

## Database

PostgreSQL is used for persistent data storage with the following main tables:

- Patients: User demographics and profiles
- Vital Signs: Time-series vital measurement records
- Devices: Connected device information and status
- Alerts: Health alerts and notifications
- Users: Provider and administrator accounts

Database schema and migrations are managed through Alembic for version control.

## Configuration

All configuration is managed through environment variables defined in `.env` files. Each component has its own configuration:

**Backend** (.env in healsense/backend/):
- Database connection URL
- API secret keys and authentication settings
- Redis cache configuration
- External service credentials (OpenAI, Firebase, etc.)
- Alert thresholds and ML model paths

**Frontend**: Configuration through environment files and component constants

For complete configuration details, see the PROJECT_COMPREHENSIVE_DOCUMENTATION.md file.

## Running Components Individually

### Backend Only

```bash
cd healsense/backend
python run.py
```

### Web Dashboard Only

```bash
cd healsense/frontend/web-app
npm install
npm run dev
```

### Mobile App Only

```bash
cd healsense/frontend/mobile-app
flutter run
```

### Notebooks (ML Training)

```bash
cd healsense
jupyter notebook notebooks/
```

## Testing

Test files are included to verify system functionality:

```bash
# Test backend database endpoints
python healsense/backend/test_db_endpoints.py

# Test phone sensor integration
python healsense/test_phone_integration.py
```

## Documentation

A comprehensive documentation file has been created with detailed information on:

- System architecture and data flow
- Complete API reference with examples
- Database schema documentation
- Deployment procedures
- Configuration guidelines
- Development setup instructions

View the complete documentation: [PROJECT_COMPREHENSIVE_DOCUMENTATION.md](PROJECT_COMPREHENSIVE_DOCUMENTATION.md)

## Deployment

The project can be deployed in multiple ways:

**Development**: Run locally with development servers for each component

**Production**: Deploy backend on cloud infrastructure (AWS EC2, Heroku, Railway), web dashboard to static hosting (Vercel, Netlify), and mobile app to app stores

**Docker**: Containerized deployment available for backend service

For detailed deployment instructions, see the comprehensive documentation.

## Development Workflow

1. Create a feature branch from main
2. Make code changes with clear commit messages
3. Test changes locally across all components
4. Create a pull request with description of changes
5. Address code review feedback
6. Merge to main after approval

## Common Issues and Solutions

**Backend not starting**: Verify PostgreSQL is running and DATABASE_URL in .env is correct

**Mobile app connection issues**: Update API_BASE_URL in Flutter config to match backend address

**Web dashboard showing no data**: Check that backend is running and accessible at configured API endpoint

**ML model training too slow**: Enable GPU training with CUDA-compatible GPU or reduce dataset size for testing

## Contributing

Contributions are welcome. Please ensure code follows project conventions and includes appropriate tests.

## Project Information

This project was developed as a comprehensive health monitoring system combining IoT integration, machine learning, and modern user interface design. It serves as a practical implementation of healthcare technology concepts.

Version: 1.0  
Last Updated: April 2026
│   │   └── package.json
│   │
│   └── web-app/               # React + Vite + Shadcn UI
│       ├── src/
│       │   ├── components/   # UI components
│       │   ├── pages/        # Page components
│       │   ├── hooks/        # Custom hooks
│       │   └── lib/          # Utilities
│       └── package.json
│
├── backend/                    # Backend API (in development)
│   └── .env.example
│
└── docs/                       # Documentation
    └── diagrams/              # PlantUML architecture diagrams
```

## 🧠 Machine Learning Model

### Architecture

- **Type**: LSTM (Long Short-Term Memory) Neural Network
- **Input**: 60 timesteps × 5 features (HR, SpO₂, Temp, BP, RR)
- **Layers**: 
  - LSTM(128) + Dropout(0.3)
  - LSTM(64) + Dropout(0.2)
  - Dense(32) + Dropout(0.1)
  - Dense(3, softmax)
- **Output**: 3 classes (Normal, Warning, Critical)

### Performance

- **Accuracy**: 93%+ on test data
- **Critical Recall**: >95% (catches emergencies)
- **Model Size**: <5MB (TFLite with float16 quantization)
- **Inference Time**: <100ms on mobile devices

### Training Features

- StandardScaler normalization
- Class weights for imbalance handling
- Early stopping & learning rate reduction
- Comprehensive evaluation (confusion matrix, ROC curves)

## 📱 Mobile Application

### Features

- **Real-Time Monitoring**: Live vital signs display with color-coded status
- **Smart Alerts**: Automatic notifications for abnormal vitals
- **Profile Management**: Patient info, medical conditions, medications
- **Emergency System**: One-tap emergency contacts with WhatsApp integration
- **Authentication**: Secure login with AsyncStorage persistence
- **Dark Mode**: Full dark mode support

### Tech Stack

- React Native 0.81.5 with Expo 54
- TypeScript 5.3.3
- React Navigation 6.x
- React Query for state management
- Expo components & APIs

## 🌐 Web Dashboard

### Features

- **Modern UI**: Shadcn UI components with Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Type-Safe**: Full TypeScript support
- **Fast Development**: Vite for instant HMR

### Tech Stack

- React 19
- Vite
- TypeScript
- Shadcn UI + Radix UI
- Tailwind CSS
- React Query

## 📊 Datasets

- **UCI Heart Disease**: 303 patients with 14 clinical features
- **PhysioNet BIDMC**: Respiratory and vital signs from ICU patients
- **Kaggle Health Data**: Various health prediction datasets
- **Synthetic Data**: 10,000 generated records with realistic distributions

## 📖 Documentation

- **[CONSTRUCTION.md](CONSTRUCTION.md)**: Complete system architecture and implementation guide
- **[healsense/README.md](healsense/README.md)**: Quick start guide for ML pipeline
- **[healsense/TODO.md](healsense/TODO.md)**: 18-week development roadmap
- **[healsense/SETUP.md](healsense/SETUP.md)**: Installation instructions
- **[healsense/MODEL_SUMMARY.md](healsense/MODEL_SUMMARY.md)**: Detailed model documentation
- **[mobile-app/README.md](healsense/frontend/mobile-app/README.md)**: Mobile app documentation

## 🛠️ Development Status

### ✅ Completed

- [x] Project structure and setup
- [x] Data collection and preprocessing pipelines
- [x] LSTM model training and evaluation
- [x] TFLite model conversion and optimization
- [x] Mobile app with full UI/UX
- [x] Web dashboard with Shadcn UI
- [x] Authentication and profile management
- [x] Real-time monitoring and alerts
- [x] Emergency contact system

### 🚧 In Progress

- [ ] Backend API development
- [ ] WebSocket real-time data streaming
- [ ] IoT sensor integration
- [ ] Database setup (PostgreSQL/Firebase)
- [ ] Cloud deployment

### 📅 Planned

- [ ] Hardware integration (Arduino/Raspberry Pi)
- [ ] WhatsApp Business API integration
- [ ] Push notifications (FCM)
- [ ] Historical data charts and analytics
- [ ] Multi-patient support
- [ ] Export health reports (PDF)

## 🧪 Testing

```bash
# Mobile app tests
cd frontend/mobile-app
npm test

# Web app tests
cd frontend/web-app
npm test
```

## 📄 License

This project is part of an academic Final Year Project (FYP).

## 👨‍💻 Author

**Umair Hakeem**

## 🙏 Acknowledgments

- UCI Machine Learning Repository for Heart Disease dataset
- PhysioNet for BIDMC dataset
- Kaggle community for health datasets
- TensorFlow and React Native communities

## 📞 Contact

For questions or collaboration, please open an issue in the repository.

---

**Project Start Date**: November 1, 2025  
**Last Updated**: January 21, 2026  
**Status**: Active Development

---

*Project initialized on: November 1, 2025*
