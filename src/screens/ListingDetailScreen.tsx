import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ListingDetail'>;

const dummyDetails = {
  id: '1',
  title: 'PG in Mukherjee Nagar',
  description:
    'Affordable, safe, and well-maintained PG with modern amenities including free Wi-Fi, hot water, and laundry services. Located near campus with convenient access to public transport.',
  address: 'Mukherjee Nagar, Delhi',
  price: '₹3,500/month',
  amenities: ['Wi-Fi', 'Laundry', 'Air Conditioning', '24/7 Security'],
  image: 'https://via.placeholder.com/300',
};

const ListingDetailScreen = ({ route }: Props): React.ReactElement => {
  const { listingId } = route.params || { listingId: dummyDetails.id };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{dummyDetails.title}</Text>
      <Image source={{ uri: dummyDetails.image }} style={styles.image} />
      <Text style={styles.price}>{dummyDetails.price}</Text>
      <Text style={styles.address}>{dummyDetails.address}</Text>
      <Text style={styles.description}>{dummyDetails.description}</Text>
      <Text style={styles.sectionTitle}>Amenities:</Text>
      {dummyDetails.amenities.map((amenity, index) => (
        <Text key={index} style={styles.amenity}>
          - {amenity}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  price: {
    fontSize: 22,
    color: '#27ae60',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  amenity: {
    fontSize: 16,
    color: '#333',
  },
});

export default ListingDetailScreen;
