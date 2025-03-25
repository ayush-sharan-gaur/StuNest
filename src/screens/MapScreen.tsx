import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = (): React.ReactElement => {
  // Dummy marker data for listings
  const markers = [
    { id: '1', title: 'PG in Mukherjee Nagar', latitude: 28.70, longitude: 77.20 },
    { id: '2', title: 'Shared Flat in Kota', latitude: 25.18, longitude: 75.83 },
    { id: '3', title: 'Hostel in Delhi', latitude: 28.61, longitude: 77.23 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.70,
          longitude: 77.20,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
