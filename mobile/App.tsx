import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import mapMarker from './src/images/marker.png';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

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
        calloutAnchor={{x: 2.7, y: 0.8}}
      >
        <Callout tooltip>
          <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>Orfanato - Lar das Meninas</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>2 orfanatos encontrados</Text>

      <TouchableOpacity style={styles.createOrphanageButton}>
        <Feather name="plus" size={30} color="#fff"/>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_800ExtraBold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    
    backgroundColor: '#FFF',
    height: 56,
    borderRadius: 26,

    flexDirection: 'row',
    paddingLeft: 24,
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
