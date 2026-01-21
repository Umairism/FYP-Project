import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVitals, getVitalStatus } from '@/hooks/useVitals';
import { useAuth } from '@/contexts/AuthContext';
import { API_CONFIG } from '@/lib/config';
import { useDarkMode } from '@/contexts/DarkModeContext';
import VitalCard from '@/components/VitalCard';
import AlertBanner from '@/components/AlertBanner';
import PatientHeader from '@/components/PatientHeader';
import EmergencyDialog from '@/components/EmergencyDialog';

const PATIENT_ID = 'P001';

const DashboardScreen = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useAuth();
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const {
    currentReading,
    readings,
    alerts,
    isConnected,
    acknowledgeAlert,
    dismissAlert,
  } = useVitals({
    patientId: PATIENT_ID,
    useMockData: API_CONFIG.useMockData,
  });

  // Convert user to patient format for components
  const patient = user ? {
    id: user.id,
    name: user.name,
    age: user.age,
    gender: 'Male', // Default value, can be added to user profile later
    bloodType: user.bloodType,
    conditions: user.medicalConditions || [],
    medications: user.currentMedications || [],
    emergencyContacts: user.emergencyContacts || [],
  } : null;

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  if (!currentReading || !patient) {
    return (
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
            Loading vitals...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <PatientHeader
        patient={patient}
        isConnected={isConnected}
        alertCount={unacknowledgedAlerts.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Alert Banner with Clear All */}
        {alerts.length > 0 && (
          <View style={styles.alertSection}>
            <AlertBanner
              alerts={alerts}
              onAcknowledge={acknowledgeAlert}
              onDismiss={dismissAlert}
            />
            <TouchableOpacity
              style={styles.clearAlertsButton}
              onPress={async () => {
                for (const alert of alerts) {
                  await dismissAlert(alert.id);
                }
              }}
            >
              <Ionicons name="trash-outline" size={16} color="#dc2626" />
              <Text style={styles.clearAlertsText}>Clear All Alerts</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Vital Cards Grid */}
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Vital Signs
        </Text>
        <View style={styles.vitalsGrid}>
          <VitalCard
            title="Heart Rate"
            value={currentReading.heartRate}
            unit="bpm"
            status={getVitalStatus('heartRate', currentReading.heartRate)}
            icon="pulse"
          />
          <VitalCard
            title="SpO₂"
            value={currentReading.spo2}
            unit="%"
            status={getVitalStatus('spo2', currentReading.spo2)}
            icon="water"
          />
          <VitalCard
            title="Temperature"
            value={currentReading.temperature}
            unit="°C"
            status={getVitalStatus('temperature', currentReading.temperature)}
            icon="thermometer"
          />
          <VitalCard
            title="Systolic BP"
            value={currentReading.systolic}
            unit="mmHg"
            status={getVitalStatus('systolic', currentReading.systolic)}
            icon="heart"
          />
          <VitalCard
            title="Diastolic BP"
            value={currentReading.diastolic}
            unit="mmHg"
            status={getVitalStatus('diastolic', currentReading.diastolic)}
            icon="heart"
          />
          <VitalCard
            title="Respiratory Rate"
            value={currentReading.respiratoryRate}
            unit="/min"
            status={getVitalStatus('respiratoryRate', currentReading.respiratoryRate)}
            icon="wind"
          />
        </View>

        {/* Emergency Button */}
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => setShowEmergencyDialog(true)}
        >
          <Ionicons name="alert-circle" size={32} color="#ffffff" />
          <Text style={styles.emergencyButtonText}>EMERGENCY</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Emergency Dialog */}
      <EmergencyDialog
        visible={showEmergencyDialog}
        patient={patient}
        currentReading={currentReading}
        onClose={() => setShowEmergencyDialog(false)}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  darkText: {
    color: '#e5e7eb',
  },
  alertSection: {
    marginBottom: 8,
  },
  clearAlertsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  clearAlertsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: '#111827',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emergencyButton: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default DashboardScreen;
