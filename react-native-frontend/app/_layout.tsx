// src/layout.tsx
import { Stack } from 'expo-router';
import { useAuth, AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';

export default function Layout() {
  return (
    <AuthProvider>
      <Provider>
      <MainContent />
      </Provider>
    </AuthProvider>
  );
}

function MainContent() {
  const { user} = useAuth();
  

  // Show LoginScreen if userId is not set
  if (!user) {
    return <LoginScreen />;
  }

  console.log(user);
  // Once userId is set, show the rest of the app
  return (
    
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
   
  );
}
