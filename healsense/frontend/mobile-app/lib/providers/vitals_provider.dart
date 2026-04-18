import 'dart:async';
import 'package:flutter/material.dart';
import 'package:healsense/models/vital_reading.dart';

class VitalsProvider with ChangeNotifier {
  VitalReading? _currentVitals;
  Timer? _pollingTimer;
  bool _isLoading = false;

  VitalReading? get currentVitals => _currentVitals;
  bool get isLoading => _isLoading;

  VitalsProvider() {
    startPolling();
  }

  void startPolling() {
    _pollingTimer?.cancel();
    _pollingTimer = Timer.periodic(const Duration(seconds: 5), (timer) {
      _fetchLatestVitals();
    });
  }

  Future<void> _fetchLatestVitals() async {
    // Mocking API call for now
    _currentVitals = VitalReading(
      heartRate: 72.0 + (DateTime.now().second % 10),
      spo2: 98.0,
      temperature: 36.6,
      bloodPressure: "120/80",
      respiratoryRate: 16.0,
      timestamp: DateTime.now(),
    );
    notifyListeners();
  }

  @override
  void dispose() {
    _pollingTimer?.cancel();
    super.dispose();
  }
}
