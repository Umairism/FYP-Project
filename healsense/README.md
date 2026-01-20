# 🩺 HealSense

Deep learning-powered health monitoring system that predicts health risks from real-time vital signs.

## What It Does

Monitors heart rate, SpO₂, temperature, and blood pressure to detect normal, warning, or critical health states. Works offline on mobile devices with real-time alerts.

## Quick Start

```bash
# Generate training data
cd healsense
python scripts/generate_synthetic_data.py

# Train model (open in Jupyter)
jupyter notebook notebooks/02_lstm_health_prediction.ipynb

# Deploy to mobile
python scripts/deploy_model.py
```

## Project Structure

```
healsense/
├── data/
│   ├── raw/              # Datasets
│   └── models/           # Trained models + TFLite
├── notebooks/            # Training notebooks
├── scripts/              # Data generation & deployment
├── frontend/mobile/      # Flutter app
└── backend/              # API (coming soon)
```

## Model Performance

- **Accuracy**: 93%+ on test data
- **Mobile-ready**: <5MB TFLite model
- **Fast inference**: <100ms on device
- **Critical recall**: >95% (catches emergencies)

## Tech Stack

- **ML**: TensorFlow/Keras LSTM
- **Mobile**: Flutter + TFLite
- **Sensors**: MAX30102 (HR/SpO₂), MLX90614 (Temp)
- **Alerts**: WhatsApp Business API

---

Built for real-world healthcare monitoring. See [TODO.md](TODO.md) for development roadmap.

---

*Project initialized on: November 1, 2025*
