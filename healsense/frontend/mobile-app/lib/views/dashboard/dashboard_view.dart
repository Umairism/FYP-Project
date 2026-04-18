import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:healsense/providers/vitals_provider.dart';
import 'package:healsense/widgets/vital_card.dart';
import 'package:healsense/core/theme/app_theme.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HealSense Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              // Navigate to profile
            },
          ),
        ],
      ),
      body: Consumer<VitalsProvider>(
        builder: (context, vitalsProvider, child) {
          final vitals = vitalsProvider.currentVitals;

          if (vitals == null) {
            return const Center(child: CircularProgressIndicator());
          }

          return RefreshIndicator(
            onRefresh: () async {
              // Trigger a manual refresh if needed
            },
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Real-time Vitals',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 16),
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    children: [
                      VitalCard(
                        label: 'Heart Rate',
                        value: vitals.heartRate.toStringAsFixed(0),
                        unit: 'bpm',
                        icon: Icons.favorite,
                        color: Colors.red,
                      ),
                      VitalCard(
                        label: 'SpO2',
                        value: vitals.spo2.toStringAsFixed(0),
                        unit: '%',
                        icon: Icons.bloodtype,
                        color: Colors.blue,
                      ),
                      VitalCard(
                        label: 'Temperature',
                        value: vitals.temperature.toStringAsFixed(1),
                        unit: '°C',
                        icon: Icons.thermostat,
                        color: Colors.orange,
                      ),
                      VitalCard(
                        label: 'Blood Pressure',
                        value: vitals.bloodPressure,
                        unit: 'mmHg',
                        icon: Icons.speed,
                        color: Colors.purple,
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          const ListTile(
                            leading: Icon(Icons.history),
                            title: Text('Vital History'),
                            subtitle: Text('View trends over the last 24 hours'),
                          ),
                          ElevatedButton(
                            onPressed: () {},
                            child: const Text('View Charts'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          _showEmergencyDialog(context);
        },
        label: const Text('EMERGENCY'),
        icon: const Icon(Icons.warning),
        backgroundColor: AppTheme.criticalRed,
      ),
    );
  }

  void _showEmergencyDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Trigger Emergency?'),
        content: const Text('This will alert your emergency contacts and medical services.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('CANCEL'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Emergency Alert Sent!')),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.criticalRed),
            child: const Text('CONFIRM'),
          ),
        ],
      ),
    );
  }
}
