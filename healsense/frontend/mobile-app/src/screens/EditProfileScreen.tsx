import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface EditProfileScreenProps {
  onClose: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age.toString() || '',
    bloodType: user?.bloodType || '',
    medicalConditions: user?.medicalConditions?.join(', ') || '',
    currentMedications: user?.currentMedications?.join(', ') || '',
    doctorName: user?.emergencyContacts?.find(c => c.type === 'doctor')?.name || '',
    doctorPhone: user?.emergencyContacts?.find(c => c.type === 'doctor')?.phone || '',
    doctorRelation: user?.emergencyContacts?.find(c => c.type === 'doctor')?.relation || '',
    familyName: user?.emergencyContacts?.find(c => c.type === 'family')?.name || '',
    familyPhone: user?.emergencyContacts?.find(c => c.type === 'family')?.phone || '',
    familyRelation: user?.emergencyContacts?.find(c => c.type === 'family')?.relation || '',
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }
    if (!formData.bloodType) {
      Alert.alert('Error', 'Blood type is required');
      return;
    }

    setIsLoading(true);

    // Build emergency contacts array
    const emergencyContacts = [];
    if (formData.doctorName && formData.doctorPhone) {
      emergencyContacts.push({
        name: formData.doctorName,
        phone: formData.doctorPhone,
        relation: formData.doctorRelation || 'Doctor',
        type: 'doctor' as const,
      });
    }
    if (formData.familyName && formData.familyPhone) {
      emergencyContacts.push({
        name: formData.familyName,
        phone: formData.familyPhone,
        relation: formData.familyRelation || 'Family',
        type: 'family' as const,
      });
    }

    const result = await updateProfile({
      name: formData.name.trim(),
      age: parseInt(formData.age),
      bloodType: formData.bloodType,
      medicalConditions: formData.medicalConditions
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0),
      currentMedications: formData.currentMedications
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0),
      emergencyContacts,
    });

    setIsLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: onClose },
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to update profile');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#e5e7eb' : '#111827'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Personal Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Full Name</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="Enter your name"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Age</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Age"
                placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
                value={formData.age}
                onChangeText={(text) => updateField('age', text)}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Blood Type</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="e.g., O+"
                placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
                value={formData.bloodType}
                onChangeText={(text) => updateField('bloodType', text.toUpperCase())}
                autoCapitalize="characters"
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.bloodTypeGrid}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.bloodTypeButton,
                  isDarkMode && styles.darkBloodTypeButton,
                  formData.bloodType === type && styles.bloodTypeButtonActive,
                ]}
                onPress={() => updateField('bloodType', type)}
              >
                <Text
                  style={[
                    styles.bloodTypeText,
                    isDarkMode && styles.darkLabel,
                    formData.bloodType === type && styles.bloodTypeTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Medical Information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
              Medical Conditions
            </Text>
            <TextInput
              style={[styles.textArea, isDarkMode && styles.darkInput]}
              placeholder="Enter conditions separated by commas (e.g., Diabetes, Hypertension)"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.medicalConditions}
              onChangeText={(text) => updateField('medicalConditions', text)}
              multiline
              numberOfLines={3}
            />
            <Text style={[styles.hint, isDarkMode && styles.darkHint]}>
              Leave empty if none
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
              Current Medications
            </Text>
            <TextInput
              style={[styles.textArea, isDarkMode && styles.darkInput]}
              placeholder="Enter medications separated by commas (e.g., Aspirin, Metformin)"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.currentMedications}
              onChangeText={(text) => updateField('currentMedications', text)}
              multiline
              numberOfLines={3}
            />
            <Text style={[styles.hint, isDarkMode && styles.darkHint]}>
              Leave empty if none
            </Text>
          </View>
        </View>

        {/* Doctor Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={20} color="#10b981" />
            <Text style={[styles.sectionTitle, { marginBottom: 0, marginLeft: 8 }, isDarkMode && styles.darkText]}>
              Doctor Emergency Contact
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Doctor Name</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="e.g., Dr. Ahmed Khan"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.doctorName}
              onChangeText={(text) => updateField('doctorName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Phone Number</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="+92 300 1234567"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.doctorPhone}
              onChangeText={(text) => updateField('doctorPhone', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Relation/Specialty</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="e.g., Primary Care Physician"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.doctorRelation}
              onChangeText={(text) => updateField('doctorRelation', text)}
            />
          </View>
        </View>

        {/* Family Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#10b981" />
            <Text style={[styles.sectionTitle, { marginBottom: 0, marginLeft: 8 }, isDarkMode && styles.darkText]}>
              Family Emergency Contact
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Name</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="e.g., Awais"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.familyName}
              onChangeText={(text) => updateField('familyName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Phone Number</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="03145647685"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.familyPhone}
              onChangeText={(text) => updateField('familyPhone', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, isDarkMode && styles.darkLabel]}>Relation</Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholder="e.g., Brother"
              placeholderTextColor={isDarkMode ? '#6b7280' : '#9ca3af'}
              value={formData.familyRelation}
              onChangeText={(text) => updateField('familyRelation', text)}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  darkText: {
    color: '#e5e7eb',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  darkLabel: {
    color: '#9ca3af',
  },
  input: {
    height: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
  },
  darkInput: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
    color: '#e5e7eb',
  },
  textArea: {
    minHeight: 80,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    fontStyle: 'italic',
  },
  darkHint: {
    color: '#6b7280',
  },
  bloodTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  bloodTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  darkBloodTypeButton: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  bloodTypeButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  bloodTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  bloodTypeTextActive: {
    color: '#ffffff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default EditProfileScreen;
