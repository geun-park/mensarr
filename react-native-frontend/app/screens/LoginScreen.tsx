// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', // Center horizontally
      padding: spacing.large,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: fonts.sizeLarge,
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
      color: colors.textPrimary,
      width: '100%', // Set width to 100% to fill the container
      maxWidth: 400, // Set a maximum width for the input fields
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.medium,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
      marginBottom: spacing.medium,
      alignItems: 'center',
      width: '80%', // Set width to 80% to make it narrower than the input fields
      maxWidth: 320, // Set a maximum width for the login button
    },
    loginButtonText: {
      color: '#fff',
      fontSize: fonts.sizeMedium,
      
    },
    error: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
  });
  

export default LoginScreen;
