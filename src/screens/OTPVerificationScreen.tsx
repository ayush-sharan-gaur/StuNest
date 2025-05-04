// src/screens/OTPVerificationScreen.tsx
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { PhoneAuthContext } from '../context/PhoneAuthContext';
import type { RootStackParamList } from '../navigation/types';

type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

const COUNTRY_CODE = '+91';

const OTPVerificationScreen = (): React.ReactElement => {
  const route = useRoute<OTPVerificationRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { phone } = route.params;
  const { confirmationResult, setConfirmationResult } = useContext(PhoneAuthContext);
  const [otp, setOtp] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerifyOTP = async () => {
    if (!confirmationResult) {
      Alert.alert('Error', 'OTP confirmation not available.');
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      Alert.alert('Success', 'OTP verified. Logging in...');
      setConfirmationResult(null);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      setErrorMessage('Incorrect OTP. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    if (resendCount >= 3) {
      Alert.alert('Limit Reached', 'You have reached the maximum number of OTP resends.');
      return;
    }
    try {
      const fullPhoneNumber = COUNTRY_CODE + phone;
      const { signInWithPhoneNumber, getAuth } = await import('firebase/auth');
      const { app } = await import('../firebaseConfig');
      const newConfirmation = await signInWithPhoneNumber(getAuth(app), fullPhoneNumber);
      setConfirmationResult(newConfirmation);
      setResendCount(resendCount + 1);
      setErrorMessage('');
      setOtp('');
      Alert.alert('OTP Sent', `A new OTP has been sent to ${phone}`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Enter the code we’ve sent by SMS to {COUNTRY_CODE} {phone}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.continueButton} onPress={handleVerifyOTP}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Haven’t received a code?</Text>
        <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
          <Text style={styles.resendButtonText}>
            Resend OTP ({3 - resendCount} left)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#FF5A5F',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  resendContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  resendText: { fontSize: 16, color: '#555' },
  resendButton: { marginLeft: 10 },
  resendButtonText: { fontSize: 16, color: '#FF5A5F' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 15 },
});

export default OTPVerificationScreen;
