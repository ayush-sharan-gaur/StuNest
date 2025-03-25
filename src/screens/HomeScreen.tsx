import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TextInput, 
  Button 
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/MainTabNavigator';
import ListingCard from '../components/ListingCard';
import { fetchListings, Listing } from '../services/api';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props): React.ReactElement => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await fetchListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const filteredListings = listings.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Listing }) => (
    <ListingCard 
      listingId={item.id}
      title={item.title}
      description={item.description}
      onPress={() => navigation.getParent()?.navigate('ListingDetail', { listingId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text>Loading Listings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listings</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search listings..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList 
        data={filteredListings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.addButtonContainer}>
        <Button 
          title="Add Listing" 
          onPress={() => navigation.getParent()?.navigate('AddListing')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  list: { paddingBottom: 20 },
  addButtonContainer: {
    padding: 20,
  },
});

export default HomeScreen;
