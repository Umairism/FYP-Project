import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VitalStatus } from '@/types/vitals';

interface VitalCardProps {
  title: string;
  value: number | string;
  unit: string;
  status: VitalStatus;
  icon: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ title, value, unit, status, icon }) => {
  const statusColors: Record<VitalStatus, { bg: string; text: string; border: string }> = {
    normal: { bg: '#ecfdf5', text: '#059669', border: '#6ee7b7' },
    warning: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
    critical: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
  };

  const colors = statusColors[status];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: colors.text + '20' },
          ]}
        >
          <Text style={[styles.statusText, { color: colors.text }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.unit, { color: colors.text }]}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '47%',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  unit: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default VitalCard;
