import 'package:json_annotation/json_annotation.dart';

part 'vital_reading.g.dart';

@JsonSerializable()
class VitalReading {
  final double heartRate;
  final double spo2;
  final double temperature;
  final String bloodPressure;
  final double respiratoryRate;
  final DateTime timestamp;

  VitalReading({
    required this.heartRate,
    required this.spo2,
    required this.temperature,
    required this.bloodPressure,
    required this.respiratoryRate,
    required this.timestamp,
  });

  factory VitalReading.fromJson(Map<String, dynamic> json) => _$VitalReadingFromJson(json);
  Map<String, dynamic> toJson() => _$VitalReadingToJson(this);
}
