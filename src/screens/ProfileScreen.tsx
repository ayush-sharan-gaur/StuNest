import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const dummyUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://via.placeholder.com/150',
};

const ProfileScreen = (): React.ReactElement => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image source={{ uri: dummyUser.image }} style={styles.profileImage} />
      <Text style={styles.name}>{user ? user.name : dummyUser.name}</Text>
      <Text style={styles.email}>{user ? user.email : dummyUser.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
});

export default ProfileScreen;
