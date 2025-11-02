# Dataset Download Summary
**Date:** November 2, 2025  
**Project:** HealSense - IoT + AI Health Monitoring System

---

## ✅ Successfully Downloaded Datasets

### 1. UCI Heart Disease Dataset
**Location:** `data/raw/uci_heart_disease/`  
**Status:** ✅ Complete  
**Files Downloaded:** 5

| File | Records | Description |
|------|---------|-------------|
| processed.cleveland.data | 303 | Cleveland Clinic Foundation |
| processed.hungarian.data | 294 | Hungarian Institute of Cardiology |
| processed.switzerland.data | 123 | University Hospital, Switzerland |
| processed.va.data | 200 | V.A. Medical Center, Long Beach |
| heart-disease.names | - | Attribute information |

**Total Records:** ~920 patient records  
**Attributes:** 14 features including age, sex, chest pain type, blood pressure, cholesterol, heart rate, etc.  
**Target:** Heart disease diagnosis (0-4 severity levels)

**Use Cases:**
- Binary classification (disease/no disease)
- Multi-class classification (severity levels)
- Feature importance analysis
- Baseline model training

---

### 2. Synthetic Vital Signs Dataset
**Location:** `data/raw/synthetic/synthetic_vital_signs.csv`  
**Status:** ✅ Generated  
**Records:** 10,000

| Feature | Mean | Std | Min | Max | Description |
|---------|------|-----|-----|-----|-------------|
| heart_rate | 78.07 | 16.47 | 50 | 149.9 | Beats per minute |
| spo2 | 96.70 | 2.07 | 85 | 100 | Blood oxygen % |
| temperature | 37.04 | 0.39 | 36 | 39.5 | Body temp (°C) |
| systolic_bp | 119.90 | 9.97 | 90 | 159 | Systolic BP (mmHg) |
| diastolic_bp | 79.96 | 7.94 | 60 | 100 | Diastolic BP (mmHg) |

**Patient IDs:** 10 synthetic patients  
**Time Range:** ~16.7 hours per patient  
**Sampling:** 1 reading per minute

**Anomaly Distribution:**
- Normal: 8,245 (82.45%)
- Low SpO2: 1,135 (11.35%)
- Abnormal Heart Rate: 423 (4.23%)
- Fever: 197 (1.97%)

**Use Cases:**
- Development and testing without privacy concerns
- Real-time simulation of patient monitoring
- Algorithm validation
- UI/UX testing
- Performance benchmarking

---

## ⏳ Pending Datasets

### 3. PhysioNet BIDMC Dataset
**Location:** `data/raw/physionet_bidmc/`  
**Status:** ⏳ Manual download required  
**Reason:** API parameter compatibility issue

**What it provides:**
- PPG (Photoplethysmogram) signals
- ECG signals
- Respiratory signals
- 53 adult ICU patients
- 125 Hz sampling rate

**How to get it:**
1. Visit: https://physionet.org/content/bidmc/1.0.0/
2. Download ZIP file manually
3. Extract to `data/raw/physionet_bidmc/`

**Note:** Not critical for Phase 1-2. Can be downloaded later for advanced model validation.

---

### 4. Kaggle Health Datasets
**Location:** `data/raw/kaggle_health_data/`  
**Status:** ⏳ Requires Kaggle API setup  
**Instructions:** See `data/raw/kaggle_health_data/INSTRUCTIONS.md`

**Setup Steps:**
```bash
# 1. Install Kaggle CLI (already done)
pip install kaggle

# 2. Get API token
# - Go to https://www.kaggle.com/account
# - Click "Create New API Token"
# - Save kaggle.json to ~/.kaggle/
# - chmod 600 ~/.kaggle/kaggle.json

# 3. Download datasets
python scripts/download_kaggle.py
```

**Recommended Datasets:**
- Heart Disease Dataset (johnsmith88/heart-disease-dataset)
- Heart Disease UCI (ronitf/heart-disease-uci)
- Medical Cost Data (mirichoi0218/insurance)
- Search for: "vital signs", "blood pressure", "health monitoring"

---

## 📊 Dataset Statistics Summary

| Dataset | Status | Records | Features | Target | Use Case |
|---------|--------|---------|----------|--------|----------|
| UCI Heart Disease | ✅ | 920 | 14 | Binary/Multi-class | Classification |
| Synthetic Vitals | ✅ | 10,000 | 7 | Status | Development/Testing |
| PhysioNet BIDMC | ⏳ | 53 patients | Time-series | N/A | Signal processing |
| Kaggle | ⏳ | Varies | Varies | Varies | Supplementary |

**Total Available Records:** 10,920 (excluding time-series)

---

## 🎯 Data Coverage for Project Requirements

### ✅ Available Now
- ✅ Heart disease classification data
- ✅ Vital signs time-series (synthetic)
- ✅ Blood pressure data
- ✅ Heart rate data
- ✅ Body temperature data
- ✅ SpO2 (blood oxygen) data

### ⏳ Optional/Supplementary
- ⏳ ECG waveforms (PhysioNet)
- ⏳ PPG waveforms (PhysioNet)
- ⏳ Additional real-world datasets (Kaggle)

---

## 📂 Directory Structure

```
data/raw/
├── uci_heart_disease/
│   ├── processed.cleveland.data (303 records)
│   ├── processed.hungarian.data (294 records)
│   ├── processed.switzerland.data (123 records)
│   ├── processed.va.data (200 records)
│   ├── heart-disease.names (metadata)
│   └── README.md
├── synthetic/
│   └── synthetic_vital_signs.csv (10,000 records)
├── physionet_bidmc/
│   ├── README.md
│   ├── NOTE.md (manual download instructions)
│   └── download_bidmc.py
└── kaggle_health_data/
    └── INSTRUCTIONS.md
```

---

## 🚀 Next Steps - Phase 1 (Data Collection & Preprocessing)

### Immediate Actions (Can Start Now)
1. ✅ **Data downloaded** - UCI and Synthetic datasets ready
2. **Create data exploration notebook**
   ```bash
   jupyter notebook notebooks/01_data_exploration.ipynb
   ```

3. **Load and explore UCI dataset**
   - Load all 4 data files
   - Combine into single DataFrame
   - Analyze distributions
   - Check for missing values
   - Visualize correlations

4. **Explore synthetic dataset**
   - Load CSV file
   - Analyze vital signs patterns
   - Visualize anomalies
   - Create time-series plots

5. **Start data preprocessing**
   - Handle missing values
   - Normalize features
   - Create train/validation/test splits
   - Generate features for ML models

### Optional (When Time Permits)
- Setup Kaggle API and download additional datasets
- Manually download PhysioNet BIDMC for signal processing
- Collect more diverse health datasets

---

## 📝 Data Quality Assessment

### UCI Heart Disease
- **Quality:** High - well-documented, clean
- **Missing Values:** Some (marked with ?)
- **Balance:** Imbalanced (more disease cases)
- **Readiness:** Ready for immediate use

### Synthetic Data
- **Quality:** Controlled - generated with known distribution
- **Missing Values:** None
- **Balance:** Adjustable (82% normal, 18% abnormal)
- **Readiness:** Ready for immediate use
- **Limitation:** Not real-world data (use for development only)

---

## ✅ Phase 1.1 Completion Checklist

- [x] Download UCI Heart Disease Dataset
- [x] Generate Synthetic Vital Signs Data
- [x] Create dataset documentation
- [x] Setup Kaggle CLI (optional)
- [ ] Create data exploration notebook
- [ ] Load and analyze datasets
- [ ] Document data quality issues
- [ ] Create data preprocessing pipeline

---

## 📊 Estimated Dataset Sizes

| Dataset | Storage Size | Memory (RAM) |
|---------|--------------|--------------|
| UCI Heart Disease | ~100 KB | < 1 MB |
| Synthetic Vitals | ~500 KB | ~2 MB |
| PhysioNet BIDMC (if downloaded) | ~50 MB | ~100 MB |
| Kaggle (varies) | 5-100 MB | 10-200 MB |

**Total Current:** ~600 KB  
**Total with all:** ~150 MB  
**Adequate for:** Development, training, and testing

---

## 🎓 Academic Citations

### UCI Heart Disease Dataset
```
Janosi,Andras, Steinbrunn,William, Pfisterer,Matthias, and Detrano,Robert. (1988). 
Heart Disease. UCI Machine Learning Repository. 
https://doi.org/10.24432/C52P4X.
```

### PhysioNet BIDMC (when used)
```
Pimentel, M. A., Santos, M. D., Springer, D. B., & Clifford, G. D. (2015). 
Heart beat detection in multimodal physiological data using a hidden semi-Markov 
model and signal quality indices. Physiological measurement, 37(9), 1717.
```

---

## 🔗 Useful Resources

- UCI ML Repository: https://archive.ics.uci.edu/ml/
- PhysioNet: https://physionet.org/
- Kaggle Datasets: https://www.kaggle.com/datasets
- WFDB Documentation: https://wfdb.readthedocs.io/
- Pandas Documentation: https://pandas.pydata.org/
- Scikit-learn: https://scikit-learn.org/

---

**Generated:** November 2, 2025  
**Last Updated:** November 2, 2025  
**Version:** 1.0
