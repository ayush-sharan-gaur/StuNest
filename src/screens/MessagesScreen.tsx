import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/MainTabNavigator';

type Props = BottomTabScreenProps<MainTabParamList, 'Messages'>;

const MessagesScreen = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.text}>No new messages.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});

export default MessagesScreen;
