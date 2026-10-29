import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map2() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.47503,
          longitude: -74.67353,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
      <Marker
          coordinate={{ latitude: 40.473330, longitude: -74.675190 }}
          title="Neighbor 1"
          description="Click on this to see cameras and trip activity"
        />
        <Marker
          coordinate={{ latitude: 40.47717, longitude: -74.67131 }}
          title="Neighbor 2"
          description="Click on this to see cameras and trip activity"
        />
        <Marker
          coordinate={{ latitude: 40.47784, longitude: -74.67329 }}
          title="Neighbor 3"
          description="Click on this to see cameras and trip activity"
        />
        <Marker
          coordinate={{ latitude: 40.47830, longitude: -74.67104 }}
          title="Neighbor 4"
          description="Click on this to see cameras and trip activity"
        />
        <Marker
          coordinate={{ latitude: 40.48380, longitude: -74.66115 }}
          title="Neighbor 5"
          description="Click on this to see cameras and trip activity"
        />
        </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
