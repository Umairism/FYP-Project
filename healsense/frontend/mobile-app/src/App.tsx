import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeProvider } from '@/contexts/DarkModeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import DashboardScreen from '@/screens/DashboardScreen';
import AlertsScreen from '@/screens/AlertsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import  {PhoneSensorScreen}  from '@/screens/PhoneSensorScreen';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabsConfig = [
  { name: 'Dashboard', component: DashboardScreen, icon: 'home' as const },
  { name: 'Phone Sensors', component: PhoneSensorScreen, icon: 'phone-portrait' as const },
  { name: 'Alerts', component: AlertsScreen, icon: 'notifications' as const },
  { name: 'Profile', component: ProfileScreen, icon: 'person' as const },
  { name: 'Settings', component: SettingsScreen, icon: 'settings' as const },
];

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const config = tabsConfig.find((t) => t.name === route.name);
          return (
            <Ionicons
              name={config?.icon as any}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
        },
      })}
    >
      {tabsConfig.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ title: tab.name }}
        />
      ))}
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {showSignup ? (
        <SignupScreen onNavigateToLogin={() => setShowSignup(false)} />
      ) : (
        <LoginScreen onNavigateToSignup={() => setShowSignup(true)} />
      )}
    </>
  );
};

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={DashboardTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
