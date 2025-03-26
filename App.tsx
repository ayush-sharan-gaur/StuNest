import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ListingDetailScreen from './src/screens/ListingDetailScreen';
import AddListingScreen from './src/screens/AddListingScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { FavouritesProvider } from './src/context/FavouritesContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export type RootStackParamList = {
  MainTabs: undefined;
  ListingDetail: { listingId: string } | undefined;
  AddListing: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ title: 'Listing Details' }} />
      <Stack.Screen name="AddListing" component={AddListingScreen} options={{ title: 'Add New Listing' }} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = (): React.ReactElement => {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <AppNavigator />
      </FavouritesProvider>
    </AuthProvider>
  );
};

export default App;
