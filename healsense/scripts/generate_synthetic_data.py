#!/usr/bin/env python3
"""
Synthetic Health Data Generator
Generates realistic synthetic vital signs data for testing
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def generate_vital_signs(num_samples=1000, patient_id=1):
    """Generate synthetic vital signs data"""
    
    np.random.seed(42 + patient_id)
    
    # Generate timestamps
    start_time = datetime.now() - timedelta(hours=num_samples/60)
    timestamps = [start_time + timedelta(minutes=i) for i in range(num_samples)]
    
    # Generate heart rate (60-100 bpm normal, with some anomalies)
    heart_rate = np.random.normal(75, 10, num_samples)
    heart_rate = np.clip(heart_rate, 50, 120)
    
    # Add some anomalies (high heart rate)
    anomaly_indices = np.random.choice(num_samples, size=int(num_samples*0.05), replace=False)
    heart_rate[anomaly_indices] = np.random.uniform(120, 150, len(anomaly_indices))
    
    # Generate SpO2 (95-100% normal)
    spo2 = np.random.normal(97, 1.5, num_samples)
    spo2 = np.clip(spo2, 90, 100)
    
    # Add some low SpO2 anomalies
    low_spo2_indices = np.random.choice(num_samples, size=int(num_samples*0.03), replace=False)
    spo2[low_spo2_indices] = np.random.uniform(85, 92, len(low_spo2_indices))
    
    # Generate body temperature (36.5-37.5°C normal)
    temperature = np.random.normal(37, 0.3, num_samples)
    temperature = np.clip(temperature, 36, 39)
    
    # Add fever anomalies
    fever_indices = np.random.choice(num_samples, size=int(num_samples*0.02), replace=False)
    temperature[fever_indices] = np.random.uniform(38, 39.5, len(fever_indices))
    
    # Generate blood pressure (systolic/diastolic)
    systolic = np.random.normal(120, 10, num_samples)
    systolic = np.clip(systolic, 90, 160)
    
    diastolic = np.random.normal(80, 8, num_samples)
    diastolic = np.clip(diastolic, 60, 100)
    
    # Create DataFrame
    data = pd.DataFrame({
        'timestamp': timestamps,
        'patient_id': patient_id,
        'heart_rate': heart_rate.round(1),
        'spo2': spo2.round(1),
        'temperature': temperature.round(1),
        'systolic_bp': systolic.round(0).astype(int),
        'diastolic_bp': diastolic.round(0).astype(int),
        'status': 'normal'
    })
    
    # Mark anomalies
    data.loc[data['heart_rate'] > 110, 'status'] = 'abnormal_hr'
    data.loc[data['spo2'] < 95, 'status'] = 'low_spo2'
    data.loc[data['temperature'] > 38, 'status'] = 'fever'
    
    return data

if __name__ == "__main__":
    print("Generating synthetic vital signs data...")
    
    # Generate data for 10 patients
    all_data = []
    for patient_id in range(1, 11):
        print(f"Generating data for patient {patient_id}...")
        patient_data = generate_vital_signs(num_samples=1000, patient_id=patient_id)
        all_data.append(patient_data)
    
    # Combine all data
    combined_data = pd.concat(all_data, ignore_index=True)
    
    # Save to CSV
    output_file = "data/raw/synthetic/synthetic_vital_signs.csv"
    combined_data.to_csv(output_file, index=False)
    print(f"✓ Synthetic data saved to {output_file}")
    print(f"✓ Generated {len(combined_data)} records for {len(all_data)} patients")
    
    # Generate statistics
    print("\n=== Data Statistics ===")
    print(combined_data.describe())
    print("\n=== Status Distribution ===")
    print(combined_data['status'].value_counts())
