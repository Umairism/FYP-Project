import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PatientProfile, VitalReading } from '@/types/vitals';

interface EmergencyDialogProps {
  visible: boolean;
  patient: PatientProfile | null;
  currentReading: VitalReading | null;
  onClose: () => void;
  isDarkMode: boolean;
}

const EmergencyDialog: React.FC<EmergencyDialogProps> = ({
  visible,
  patient,
  currentReading,
  onClose,
  isDarkMode,
}) => {
  if (!patient) return null;

  const doctorContact = patient.emergencyContacts.find(c => c.type === 'doctor');
  const familyContact = patient.emergencyContacts.find(c => c.type === 'family');

  const handleCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  };

  const handleWhatsApp = (phoneNumber: string, contactName: string) => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    let message = `🚨 EMERGENCY ALERT 🚨\n\n`;
    message += `Patient: ${patient.name}\n`;
    message += `Age: ${patient.age} years\n`;
    message += `Blood Type: ${patient.bloodType}\n\n`;
    
    if (currentReading) {
      message += `📊 CURRENT VITAL SIGNS:\n`;
      message += `❤️ Heart Rate: ${currentReading.heartRate} bpm\n`;
      message += `🫁 SpO₂: ${currentReading.spo2}%\n`;
      message += `🌡️ Temperature: ${currentReading.temperature}°C\n`;
      message += `💉 Blood Pressure: ${currentReading.systolic}/${currentReading.diastolic} mmHg\n`;
      message += `💨 Respiratory Rate: ${currentReading.respiratoryRate}/min\n\n`;
      
      const readingTime = new Date(currentReading.timestamp);
      message += `⏰ Reading Time: ${readingTime.toLocaleTimeString()}\n\n`;
    }
    
    message += `⚠️ IMMEDIATE ASSISTANCE REQUIRED!`;
    
    Linking.openURL(`whatsapp://send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialog, isDarkMode && styles.darkDialog]}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="alert-circle" size={40} color="#dc2626" />
            </View>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              Emergency Alert
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Patient Information */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                Patient Information
              </Text>
              <View style={[styles.infoCard, isDarkMode && styles.darkCard]}>
                <View style={styles.infoRow}>
                  <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Name:</Text>
                  <Text style={[styles.value, isDarkMode && styles.darkText]}>{patient.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Age:</Text>
                  <Text style={[styles.value, isDarkMode && styles.darkText]}>{patient.age} years</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Blood Type:</Text>
                  <Text style={[styles.value, isDarkMode && styles.darkText]}>{patient.bloodType}</Text>
                </View>
              </View>
            </View>

            {/* Medical Conditions */}
            {patient.conditions.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                  Medical Conditions
                </Text>
                <View style={[styles.infoCard, isDarkMode && styles.darkCard]}>
                  {patient.conditions.map((condition, index) => (
                    <Text key={index} style={[styles.listItem, isDarkMode && styles.darkText]}>
                      • {condition}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Doctor Contact */}
            {doctorContact && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                  Emergency Contacts
                </Text>
                
                {/* Doctor Contact Row */}
                <View style={styles.contactRow}>
                  <View style={styles.contactInfo}>
                    <View style={styles.contactHeader}>
                      <Ionicons name="medical" size={20} color="#10b981" />
                      <Text style={[styles.contactLabelMain, isDarkMode && styles.darkText]}>Doctor</Text>
                    </View>
                    <Text style={[styles.contactName, isDarkMode && styles.darkLabel]}>
                      {doctorContact.name}
                    </Text>
                    <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>
                      {doctorContact.phone}
                    </Text>
                  </View>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity 
                      style={[styles.iconButton, styles.callButton]} 
                      onPress={() => handleCall(doctorContact.phone)}
                    >
                      <Ionicons name="call" size={20} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.iconButton, styles.whatsappButton]} 
                      onPress={() => handleWhatsApp(doctorContact.phone, doctorContact.name)}
                    >
                      <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Family Contact Row */}
                {familyContact && (
                  <View style={[styles.contactRow, { marginTop: 12 }]}>
                    <View style={styles.contactInfo}>
                      <View style={styles.contactHeader}>
                        <Ionicons name="people" size={20} color="#10b981" />
                        <Text style={[styles.contactLabelMain, isDarkMode && styles.darkText]}>Family</Text>
                      </View>
                      <Text style={[styles.contactName, isDarkMode && styles.darkLabel]}>
                        {familyContact.name}
                      </Text>
                      <Text style={[styles.contactPhone, isDarkMode && styles.darkSubtext]}>
                        {familyContact.phone}
                      </Text>
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity 
                        style={[styles.iconButton, styles.callButton]} 
                        onPress={() => handleCall(familyContact.phone)}
                      >
                        <Ionicons name="call" size={20} color="#ffffff" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.iconButton, styles.whatsappButton]} 
                        onPress={() => handleWhatsApp(familyContact.phone, familyContact.name)}
                      >
                        <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}

            {!doctorContact && !familyContact && (
              <View style={styles.section}>
                <Text style={[styles.noContactText, isDarkMode && styles.darkLabel]}>
                  No emergency contacts configured
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
              <Ionicons name="call" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.whatsappButton]}>
              <Ionicons name="logo-whatsapp" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  darkDialog: {
    backgroundColor: '#1f2937',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
  },
  headerIcon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  darkText: {
    color: '#e5e7eb',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  contactLabelMain: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 13,
    color: '#6b7280',
  },
  darkSubtext: {
    color: '#9ca3af',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContactText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  callButton: {
    backgroundColor: '#dc2626',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  infoCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  darkLabel: {
    color: '#9ca3af',
  },
  value: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 12,
    color: '#374151',
    paddingVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    paddingTop: 16,
  },
});

export default EmergencyDialog;
