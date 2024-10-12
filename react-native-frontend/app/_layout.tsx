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
  const { userId, username} = useAuth();
  

  // Show LoginScreen if userId is not set
  if (!userId) {
    return <LoginScreen />;
  }

  console.log(userId);
  console.log(username);
  // Once userId is set, show the rest of the app
  return (
    
         <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
   
  );
}
