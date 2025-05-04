import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/types';

const LoginScreen = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Failed to log in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 15 },
  registerContainer: { marginTop: 20, alignItems: 'center' },
});

export default LoginScreen;
