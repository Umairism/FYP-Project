import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { useAuth } from '@/contexts/AuthContext';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Account Section */}
        {user && (
          <View style={styles.settingSection}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Account</Text>
            <View style={[styles.accountCard, isDarkMode && styles.darkCard]}>
              <View style={styles.accountInfo}>
                <Ionicons name="person-circle" size={48} color="#10b981" />
                <View style={styles.accountDetails}>
                  <Text style={[styles.accountName, isDarkMode && styles.darkText]}>{user.name}</Text>
                  <Text style={[styles.accountEmail, isDarkMode && styles.darkLabel]}>{user.email}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Preferences</Text>

          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, isDarkMode && styles.darkLabel]}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#a7f3d0' }}
              thumbColor="#10b981"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, isDarkMode && styles.darkLabel]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#d1d5db', true: '#a7f3d0' }}
              thumbColor="#10b981"
            />
          </View>
        </View>

        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>About</Text>
          <Text style={[styles.aboutText, isDarkMode && styles.darkLabel]}>HealSense Mobile App</Text>
          <Text style={[styles.versionText, isDarkMode && styles.darkSubtext]}>Version 0.0.1</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  accountCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountDetails: {
    marginLeft: 12,
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  accountEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLabel: {
    fontSize: 14,
    color: '#374151',
  },
  darkLabel: {
    color: '#9ca3af',
  },
  aboutText: {
    fontSize: 14,
    color: '#6b7280',
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  darkSubtext: {
    color: '#6b7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});

export default SettingsScreen;
