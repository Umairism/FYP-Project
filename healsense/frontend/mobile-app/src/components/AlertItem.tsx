import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '@/types/vitals';

interface AlertItemProps {
  alert: Alert;
  isDarkMode: boolean;
  onAcknowledge?: () => void;
  onDismiss?: () => void;
  isAcknowledged?: boolean;
}

const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  isDarkMode,
  onAcknowledge,
  onDismiss,
  isAcknowledged,
}) => {
  const statusColor = alert.type === 'critical' ? '#dc2626' : '#d97706';

  return (
    <View style={[styles.container, { borderLeftColor: statusColor }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.type, { color: statusColor }]}>
            {alert.type.toUpperCase()}
          </Text>
          <Text style={styles.time}>
            {new Date(alert.timestamp).toLocaleTimeString()}
          </Text>
        </View>
        <Text style={[styles.vitalType, isDarkMode && styles.darkText]}>
          {alert.vitalType.charAt(0).toUpperCase() + alert.vitalType.slice(1)}
        </Text>
        <Text style={[styles.value, isDarkMode && styles.darkText]}>
          Value: {alert.value} • Threshold: {alert.threshold}
        </Text>
      </View>
      {!isAcknowledged && onAcknowledge && (
        <View style={styles.actions}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#10b981"
            onPress={onAcknowledge}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  type: {
    fontSize: 12,
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  vitalType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  darkText: {
    color: '#e5e7eb',
  },
  value: {
    fontSize: 12,
    color: '#6b7280',
  },
  actions: {
    marginLeft: 12,
  },
});

export default AlertItem;
