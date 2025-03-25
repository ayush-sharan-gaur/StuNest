import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/MainTabNavigator';
import ListingCard from '../components/ListingCard';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

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
      // Since ListingDetail is in the parent stack navigator,
      // use getParent() to navigate to it.
      onPress={() => navigation.getParent()?.navigate('ListingDetail', { listingId: item.id })}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: { paddingBottom: 20 },
});

export default HomeScreen;
