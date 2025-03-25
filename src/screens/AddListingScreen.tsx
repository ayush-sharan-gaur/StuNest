import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddListing'>;

const AddListingScreen = ({ navigation }: Props): React.ReactElement => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !price || !address) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    Alert.alert('Success', 'Listing Added Successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter listing title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Enter listing description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price (e.g., ₹3,500/month)"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddListingScreen;
