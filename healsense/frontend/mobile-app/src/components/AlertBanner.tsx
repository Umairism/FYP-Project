import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '@/types/vitals';

interface AlertBannerProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alerts, onAcknowledge, onDismiss }) => {
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).slice(0, 3);

  if (unacknowledgedAlerts.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="warning" size={20} color="#dc2626" />
        <Text style={styles.headerText}>
          {unacknowledgedAlerts.length} Active Alert{unacknowledgedAlerts.length > 1 ? 's' : ''}
        </Text>
      </View>

      {unacknowledgedAlerts.map((alert) => (
        <View key={alert.id} style={styles.alertItem}>
          <View style={styles.alertInfo}>
            <Text style={styles.alertType}>{alert.vitalType}</Text>
            <Text style={styles.alertValue}>
              {alert.value} {alert.threshold}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={() => onDismiss(alert.id)}
          >
            <Ionicons name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991b1b',
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#fecaca',
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#991b1b',
    textTransform: 'capitalize',
  },
  alertValue: {
    fontSize: 11,
    color: '#7f1d1d',
    marginTop: 2,
  },
  dismissButton: {
    padding: 4,
  },
});

export default AlertBanner;
