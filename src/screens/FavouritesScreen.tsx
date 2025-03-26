import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import ListingCard from '../components/ListingCard';
import { fetchListings, Listing } from '../services/api';

const FavouritesScreen: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await fetchListings();
        setAllListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const favouriteListings = allListings.filter(listing => favourites.includes(listing.id));

  const renderItem = ({ item }: { item: Listing }) => (
    <ListingCard listingId={item.id} title={item.title} description={item.description} onPress={() => {}} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text>Loading Favourites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite Listings</Text>
      {favouriteListings.length === 0 ? (
        <Text style={styles.noFavourites}>No favourites yet.</Text>
      ) : (
        <FlatList data={favouriteListings} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={styles.list} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  noFavourites: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  list: { paddingBottom: 20 },
});

export default FavouritesScreen;
