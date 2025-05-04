// src/navigation/types.ts
export type RootStackParamList = {
  Welcome: undefined;
  OTPVerification: { phone: string }; // New OTP screen route
  MainTabs: undefined;
  Login: undefined;
  Register: undefined;
};
