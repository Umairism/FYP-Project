import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { PatientProfile } from '@/types/vitals';

interface PatientProfileCardProps {
  patient: PatientProfile;
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ patient }) => {
  return (
    <View>
      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{patient.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{patient.age} years</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{patient.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Blood Type</Text>
          <Text style={styles.value}>{patient.bloodType}</Text>
        </View>
      </View>

      {/* Medical Conditions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Conditions</Text>
        {patient.conditions.map((condition, index) => (
          <View style={styles.listItem} key={`condition-${index}`}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>{condition}</Text>
          </View>
        ))}
      </View>

      {/* Medications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Medications</Text>
        {patient.medications.map((medication, index) => (
          <View style={styles.listItem} key={`medication-${index}`}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>{medication}</Text>
          </View>
        ))}
      </View>

      {/* Emergency Contact */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        
        {patient.emergencyContacts.map((contact, index) => (
          <View key={index} style={index > 0 ? styles.contactSeparator : undefined}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactType}>
                {contact.type === 'doctor' ? '🩺 Doctor' : '👨‍👩‍👧 Family'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{contact.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{contact.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Relation</Text>
              <Text style={styles.value}>{contact.relation}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  value: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  bullet: {
    marginRight: 8,
    color: '#10b981',
    fontWeight: '700',
  },
  listItemText: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
  },
  contactSeparator: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  contactHeader: {
    marginBottom: 8,
  },
  contactType: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
  },
});

export default PatientProfileCard;
