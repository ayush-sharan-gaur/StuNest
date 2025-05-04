import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/types';

const RegisterScreen = (): React.ReactElement => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await register(email, password);
    } catch (error: any) {
      Alert.alert('Registration Error', error.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <View style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 15 },
  loginContainer: { marginTop: 20, alignItems: 'center' },
});

export default RegisterScreen;
