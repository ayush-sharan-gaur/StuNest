// src/screens/WelcomeScreen.tsx
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  signInWithPhoneNumber,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  OAuthProvider,
} from 'firebase/auth';
import { app } from '../firebaseConfig';
import { PhoneAuthContext } from '../context/PhoneAuthContext';
import type { RootStackParamList } from '../navigation/types';

// Google Sign-In
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// Apple Sign-In (iOS)
import appleAuth from '@invertase/react-native-apple-authentication';

const COUNTRY_CODE = '+91';

const WelcomeScreen = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const { setConfirmationResult } = useContext(PhoneAuthContext);
  const auth = getAuth(app);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual webClientId
    });
  }, []);

  // Phone number OTP flow
  const handleContinue = async () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone.match(/^\d{10}$/)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      const fullPhoneNumber = COUNTRY_CODE + trimmedPhone;
      console.log('Full phone number:', fullPhoneNumber);
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber);
      setConfirmationResult(confirmation);
      navigation.navigate('OTPVerification', { phone: trimmedPhone });
    } catch (error: any) {
      Alert.alert('Error sending OTP', error.message || 'Please try again.');
    }
  };

  // Google Sign-In flow
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      if (!idToken) {
        throw new Error('No idToken returned from Google Sign-In');
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      Alert.alert('Success', 'Signed in with Google!');
      navigation.navigate('MainTabs');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow.
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign in is in progress already.
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated.
      }
      Alert.alert('Google Sign-In Error', error.message || 'Failed to sign in with Google.');
    }
  };

  // Apple Sign-In flow (iOS only)
  const handleAppleSignIn = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Not supported', 'Apple Sign In is only available on iOS devices.');
      return;
    }
    try {
      const appleResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.AppleRequestOperation.LOGIN,
        requestedScopes: [appleAuth.AppleRequestScope.EMAIL, appleAuth.AppleRequestScope.FULL_NAME],
      });
      if (!appleResponse.identityToken) {
        throw new Error('Apple Sign-In failed – no identity token returned');
      }
      // Note: In the new Firebase modular SDK, use OAuthProvider.credential to build an Apple credential.
      const { identityToken, nonce } = appleResponse;
      const appleCredential = OAuthProvider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });
      await signInWithCredential(auth, appleCredential);
      Alert.alert('Success', 'Signed in with Apple!');
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Apple Sign-In Error', error.message || 'Failed to sign in with Apple.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.skipText}>×</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Log in to StuNest</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>{COUNTRY_CODE}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter mobile number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.altButton} onPress={handleGoogleSignIn}>
          <Text style={styles.altButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altButton} onPress={handleAppleSignIn}>
          <Text style={styles.altButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  skipButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  skipText: { fontSize: 30, fontWeight: 'bold', color: '#aaa' },
  content: { marginHorizontal: 30, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  countryCode: { fontSize: 16, marginRight: 8 },
  phoneInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  continueButton: {
    backgroundColor: '#FF5A5F',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  orText: { fontSize: 16, color: '#888', marginBottom: 20 },
  altButton: {
    borderWidth: 1,
    borderColor: '#FF5A5F',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  altButtonText: { fontSize: 18, fontWeight: '600', color: '#FF5A5F' },
});

export default WelcomeScreen;
