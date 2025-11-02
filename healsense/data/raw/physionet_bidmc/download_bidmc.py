
import wfdb
import os

print("Downloading BIDMC PPG and Respiration Dataset...")

# BIDMC database has records 1-53
data_dir = "."  # Current directory
os.makedirs(data_dir, exist_ok=True)

# Download sample records (1-10 for now, can expand later)
for record_num in range(1, 11):
    record_name = f"bidmc_{record_num:02d}"
    try:
        print(f"Downloading record {record_num}/10...")
        # Correct parameters for wfdb.rdrecord
        wfdb.rdrecord(record_name, pn_dir='bidmc/1.0.0/')
        print(f"✓ Record {record_num} downloaded")
    except Exception as e:
        print(f"✗ Error downloading record {record_num}: {e}")

print("PhysioNet BIDMC download complete!")
