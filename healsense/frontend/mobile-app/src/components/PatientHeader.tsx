import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PatientProfile } from '@/types/vitals';

interface PatientHeaderProps {
  patient: PatientProfile;
  isConnected: boolean;
  alertCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  isConnected,
  alertCount,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={[styles.name, isDarkMode && styles.darkText]}>
            {patient.name}
          </Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isConnected ? '#10b981' : '#ef4444' },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isConnected ? '#10b981' : '#ef4444' },
              ]}
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {alertCount > 0 && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>{alertCount}</Text>
            </View>
          )}
          <TouchableOpacity onPress={onToggleDarkMode}>
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={24}
              color={isDarkMode ? '#fbbf24' : '#6b7280'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  darkContainer: {
    backgroundColor: '#1f2937',
    borderBottomColor: '#374151',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  darkText: {
    color: '#e5e7eb',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default PatientHeader;
