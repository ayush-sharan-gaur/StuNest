import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { fetchListings, Listing } from '../services/api';

const HomeScreen = (): React.ReactElement => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await fetchListings();
        setListings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const filteredListings = listings.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Listing }) => (
    <View style={styles.listingCard}>
      <Text style={styles.listingTitle}>{item.title}</Text>
      <Text style={styles.listingPrice}>₹{item.price}/month</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5A5F" />
        <Text>Loading Listings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search listings..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Filters:</Text>
        {/* Add filter buttons as needed */}
      </View>
      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 10 },
  searchBar: { 
    marginHorizontal: 10, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 25, 
    backgroundColor: '#fff', 
    marginBottom: 10 
  },
  filterRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 10, 
    marginBottom: 10 
  },
  filterText: { fontSize: 16, fontWeight: '500' },
  listContainer: { paddingBottom: 80 },
  listingCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 8, 
    marginHorizontal: 10, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  listingTitle: { fontSize: 18, fontWeight: '600' },
  listingPrice: { fontSize: 16, color: '#FF5A5F', marginTop: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
