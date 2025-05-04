import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const MessagesScreen = (): React.ReactElement => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.lockedText}>Messages are locked. Please log in to access your messages.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text>Your messages will appear here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fafafa' },
  lockedText: { fontSize: 18, textAlign: 'center', color: '#555' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});

export default MessagesScreen;
