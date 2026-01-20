import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import App from '@/App';

export default function Root() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <App />
    </SafeAreaView>
  );
}
