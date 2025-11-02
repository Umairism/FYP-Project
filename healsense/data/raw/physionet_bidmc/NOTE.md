# PhysioNet BIDMC Dataset - Manual Download Instructions

## Note
The automated download is encountering issues with the dataset naming convention.
For now, we'll use synthetic data for development and testing.

## Manual Download (If Needed Later)

### Option 1: Direct Download from PhysioNet
1. Visit: https://physionet.org/content/bidmc/1.0.0/
2. Click "Download the ZIP file"
3. Extract to this directory
4. The dataset contains 53 patient records

### Option 2: Use Alternative Datasets
Since BIDMC is primarily for research validation, we can use:
- Synthetic generated data (already created)
- UCI Heart Disease dataset (already downloaded)
- Kaggle health datasets (can be downloaded)

## What This Dataset Would Provide
- PPG (Photoplethysmogram) signals
- ECG signals
- Respiration signals
- Sampling rate: 125 Hz

## For Development
We'll use synthetic data that mimics real-world vital signs:
- See: data/raw/synthetic/synthetic_vital_signs.csv
- 10,000 records with realistic vital signs
- Includes normal and abnormal patterns

## Status
- ✅ UCI Heart Disease: Downloaded successfully
- ⚠️ PhysioNet BIDMC: Use manual download if needed
- ✅ Synthetic Data: Available for immediate use
- ⏳ Kaggle Datasets: Requires API setup
