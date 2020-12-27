import React from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from './src/images/marker.png';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <MapView
     provider={PROVIDER_GOOGLE} // Definir o mapa do google como default p/ android e IOS;
      style={styles.map}
      initialRegion={{
        latitude: -1.3968325,
        longitude: -48.4340396,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      }}
    >
      <Marker 
        icon={mapMarker}
        coordinate={{
          latitude: -1.3968325,
          longitude: -48.4340396,
        }}
      />
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
