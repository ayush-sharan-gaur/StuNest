import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';

type ListingCardProps = {
  listingId: string;
  title: string;
  description: string;
  onPress: () => void;
};

const ListingCard = ({ listingId, title, description, onPress }: ListingCardProps): React.ReactElement => {
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.includes(listingId);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(listingId);
    } else {
      addFavourite(listingId);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.favouriteButton}>
        <Button title={isFavourite ? "Unfavourite" : "Favourite"} onPress={toggleFavourite} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {},
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  favouriteButton: {
    marginLeft: 10,
  },
});

export default ListingCard;
