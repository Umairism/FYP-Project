import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVitals } from '@/hooks/useVitals';
import { API_CONFIG } from '@/lib/config';
import { useDarkMode } from '@/contexts/DarkModeContext';
import AlertItem from '@/components/AlertItem';

const PATIENT_ID = '1';

const AlertsScreen = () => {
  const { isDarkMode } = useDarkMode();
  const { alerts, acknowledgeAlert, dismissAlert } = useVitals({
    patientId: PATIENT_ID,
    useMockData: API_CONFIG.useMockData,
  });

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);
  const acknowledgedAlerts = alerts.filter((a) => a.acknowledged);

  const handleClearAll = async () => {
    for (const alert of alerts) {
      await dismissAlert(alert.id);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>Alerts</Text>
          <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
            {unacknowledgedAlerts.length} unacknowledged
          </Text>
        </View>
        {alerts.length > 0 && (
          <TouchableOpacity 
            style={styles.clearAllButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={20} color="#dc2626" />
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {unacknowledgedAlerts.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Active Alerts ({unacknowledgedAlerts.length})
            </Text>
            {unacknowledgedAlerts.map((alert) => (
              <AlertItem
                alert={alert}
                isDarkMode={isDarkMode}
                onAcknowledge={() => acknowledgeAlert(alert.id)}
                onDismiss={() => dismissAlert(alert.id)}
                key={alert.id}
              />
            ))}
          </>
        )}

        {acknowledgedAlerts.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText, { marginTop: 24 }]}>
              Acknowledged ({acknowledgedAlerts.length})
            </Text>
            {acknowledgedAlerts.map((alert) => (
              <AlertItem
                alert={alert}
                isDarkMode={isDarkMode}
                onDismiss={() => dismissAlert(alert.id)}
                isAcknowledged
                key={alert.id}
              />
            ))}
          </>
        )}

        {alerts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDarkMode && styles.darkText]}>
              No alerts
            </Text>
          </View>
        )}
      </ScrollView>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  darkText: {
    color: '#e5e7eb',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  darkSubtitle: {
    color: '#9ca3af',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
});

export default AlertsScreen;
