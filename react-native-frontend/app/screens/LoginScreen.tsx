// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing, borderRadius } from '../theme';

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');  // Clear any previous error
      await login(username);  // Call the login function from context
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry  // Mask the password input
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin}  />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: spacing.large,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: fonts.sizeLarge,
      fontFamily: fonts.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.large,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: borderRadius.medium,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
      marginBottom: spacing.medium,
      borderWidth: 1,
      borderColor: colors.textSecondary,
      fontSize: fonts.sizeMedium,
      fontFamily: fonts.regular,
      color: colors.textPrimary,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.medium,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
      marginBottom: spacing.medium,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#fff',
      fontSize: fonts.sizeMedium,
      fontFamily: fonts.bold,
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
  
  });
  

export default LoginScreen;
