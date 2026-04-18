import 'package:dio/dio.dart';
import 'package:healsense/models/vital_reading.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'http://10.10.86.33:5000/api/v1',
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
  ));

  Future<VitalReading> fetchLatestVitals(String patientId) async {
    try {
      final response = await _dio.get('/vitals/$patientId/latest');
      return VitalReading.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<VitalReading>> fetchVitalHistory(String patientId) async {
    try {
      final response = await _dio.get('/vitals/$patientId/history');
      return (response.data as List)
          .map((item) => VitalReading.fromJson(item))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> triggerEmergency(String patientId) async {
    try {
      await _dio.post('/emergency/trigger', data: {'patientId': patientId});
    } catch (e) {
      rethrow;
    }
  }
}
