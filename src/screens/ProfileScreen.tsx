import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const dummyUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://via.placeholder.com/150',
};

const ProfileScreen = (): React.ReactElement => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user ? user.name : dummyUser.name);
  const [email, setEmail] = useState(user ? user.email : dummyUser.email);

  const handleSave = () => {
    // Simulate profile update – in production, call your API here.
    Alert.alert('Profile Updated', 'Your profile details have been updated.');
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: dummyUser.image }} style={styles.profileImage} />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </>
      )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
});

export default ProfileScreen;
