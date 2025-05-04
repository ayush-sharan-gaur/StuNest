import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { AuthProvider } from './src/context/AuthContext';
import { PhoneAuthProvider } from './src/context/PhoneAuthContext';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = (): React.ReactElement => {
  return (
    <AuthProvider>
      <PhoneAuthProvider>
        <AppNavigator />
      </PhoneAuthProvider>
    </AuthProvider>
  );
};

export default App;
