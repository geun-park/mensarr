// src/layout.tsx
import { Stack } from 'expo-router';
import { useAuth, AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function Layout() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

function MainContent() {
  const { userId } = useAuth();
  

  // Show LoginScreen if userId is not set
  if (!userId) {
    return <LoginScreen />;
  }

  console.log("user id set");
  // Once userId is set, show the rest of the app
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

  );
}
