// src/screens/AddListingScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, Image } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { addListing, Listing } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'AddListing'>;

const AddListingScreen = ({ navigation }: Props): React.ReactElement => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [imageUri, setImageUri] = useState<string>('');

  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // typed as 'photo'
      quality: 0.7,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Assert that uri exists using ?? or !
        setImageUri(response.assets[0].uri ?? '');
      }
    });
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !address) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newListing: Listing = {
      id: Date.now().toString(),
      title,
      description,
      price: parseInt(price),
      imageUrl: imageUri || 'https://via.placeholder.com/300',
      address,
    };
    const success = await addListing(newListing);
    if (success) {
      Alert.alert('Success', 'Listing Added Successfully!');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to add listing. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput style={styles.input} placeholder="Enter listing title" value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Description:</Text>
      <TextInput style={[styles.input, styles.multiline]} placeholder="Enter listing description" value={description} onChangeText={setDescription} multiline numberOfLines={4} />
      <Text style={styles.label}>Price:</Text>
      <TextInput style={styles.input} placeholder="Enter price (e.g., 3500)" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Text style={styles.label}>Address:</Text>
      <TextInput style={styles.input} placeholder="Enter address" value={address} onChangeText={setAddress} />
      <Button title="Select Image" onPress={pickImage} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.selectedImage} /> : null}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10 },
  multiline: { height: 100, textAlignVertical: 'top' },
  selectedImage: { width: '100%', height: 200, marginVertical: 15 },
});

export default AddListingScreen;
