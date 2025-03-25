import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ListingCard from '../components/ListingCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Listing = {
  id: string;
  title: string;
  description: string;
};

const dummyListings: Listing[] = [
  { id: '1', title: 'PG in Mukherjee Nagar', description: 'Affordable and safe housing near campus.' },
  { id: '2', title: 'Shared Flat in Kota', description: 'Ideal for students, spacious and well-connected.' },
  { id: '3', title: 'Hostel in Delhi', description: 'Secure hostel with all amenities.' },
];

const HomeScreen = ({ navigation }: Props): React.ReactElement => {
  const renderItem = ({ item }: { item: Listing }) => (
    <ListingCard 
      listingId={item.id}
      title={item.title}
      description={item.description}
      onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listings</Text>
      <FlatList 
        data={dummyListings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default HomeScreen;
