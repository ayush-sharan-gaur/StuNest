import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import { AuthContext } from '../context/AuthContext';

const FavouritesScreen = (): React.ReactElement => {
  const { favourites } = useContext(FavouritesContext);
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Please log in to view your wishlist.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {favourites.length === 0 ? (
        <Text style={styles.infoText}>No favourite listings yet.</Text>
      ) : (
        <Text>Favourite listings go here.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  infoText: { fontSize: 18, textAlign: 'center', color: '#555' },
});

export default FavouritesScreen;
