import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import type { RootStackParamList } from './types';

export type MainTabParamList = {
  Explore: undefined;
  Wishlist: undefined;
  Messages: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', paddingVertical: 5 },
      }}>
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={FavouritesScreen} />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ tabBarLabel: user ? 'Messages' : 'Locked' }}
      />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
