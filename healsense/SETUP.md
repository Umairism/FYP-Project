# HealSense Setup Guide

Quick guide to get the project running.

## Prerequisites

- Python 3.10+
- pip
- Jupyter Notebook

## Installation

```bash
# Clone repo
cd healsense

# Create virtual environment
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Generate Training Data

```bash
python scripts/generate_synthetic_data.py
```

This creates 10,000 vital sign records with proper Normal/Warning/Critical labels.

## Train Model

```bash
jupyter notebook notebooks/02_lstm_health_prediction.ipynb
```

Run all cells to:
- Load and preprocess data
- Train LSTM with dropout and early stopping
- Evaluate with confusion matrix and per-class metrics
- Convert to TFLite for mobile

Expected training time: ~10-20 minutes on CPU, ~5 minutes on GPU.

## Deploy to Mobile

```bash
python scripts/deploy_model.py
```

This generates:
- Quantized TFLite model (<5MB)
- Flutter integration guide
- Deployment config

Copy `data/models/tflite/health_model_float16.tflite` to your Flutter app's `assets/` folder.

## Model Performance

After training, you should see:
- Test accuracy: 93%+
- Critical recall: 95%+ (most important)
- Model size: 2-4 MB
- Inference: <100ms

## Next Steps

1. Integrate TFLite model with Flutter app (see `FLUTTER_INTEGRATION.md`)
2. Connect real sensors (MAX30102, MLX90614)
3. Test on Android/iOS device
4. Deploy backend API for cloud sync

## Troubleshooting

**TensorFlow GPU not detected?**
```bash
pip install tensorflow[and-cuda]
```

**Out of memory during training?**
- Reduce batch size in notebook (CONFIG['batch_size'] = 16)
- Use fewer LSTM units

**Model accuracy too low?**
- Check class distribution in data
- Increase training epochs
- Adjust class weights

---

Need help? Check [TODO.md](TODO.md) for full project roadmap.
