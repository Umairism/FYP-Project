import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/contexts/DarkModeContext';
import PatientProfileCard from '@/components/PatientProfileCard';
import EditProfileScreen from '@/screens/EditProfileScreen';

const ProfileScreen = () => {
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Convert user to patient format for PatientProfileCard
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


  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setShowEditProfile(true)}
        >
          <Ionicons name="create-outline" size={24} color="#10b981" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {patient && <PatientProfileCard patient={patient} />}
        
        {/* Medical Conditions Section */}
        {user && user.medicalConditions && user.medicalConditions.length > 0 && (
          <View style={[styles.section, isDarkMode && styles.darkSection]}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Medical Conditions
            </Text>
            {user.medicalConditions.map((condition, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="medical" size={16} color="#ef4444" />
                <Text style={[styles.listText, isDarkMode && styles.darkLabel]}>
                  {condition}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Current Medications Section */}
        {user && user.currentMedications && user.currentMedications.length > 0 && (
          <View style={[styles.section, isDarkMode && styles.darkSection]}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Current Medications
            </Text>
            {user.currentMedications.map((medication, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="flask" size={16} color="#10b981" />
                <Text style={[styles.listText, isDarkMode && styles.darkLabel]}>
                  {medication}
                </Text>
              </View>
            ))}
          </View>
        )}

        {(!user?.medicalConditions?.length && !user?.currentMedications?.length) && (
          <View style={[styles.emptyState, isDarkMode && styles.darkSection]}>
            <Ionicons name="fitness" size={48} color={isDarkMode ? '#4b5563' : '#d1d5db'} />
            <Text style={[styles.emptyText, isDarkMode && styles.darkLabel]}>
              No medical conditions or medications recorded
            </Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowEditProfile(true)}
            >
              <Text style={styles.addButtonText}>Add Medical Information</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <EditProfileScreen onClose={() => setShowEditProfile(false)} />
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  darkHeader: {
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  darkText: {
    color: '#e5e7eb',
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  darkSection: {
    backgroundColor: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  listText: {
    fontSize: 14,
    color: '#374151',
  },
  darkLabel: {
    color: '#9ca3af',
  },
  emptyState: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 32,
    marginTop: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProfileScreen;
