import React, { useState, useEffect  } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/marker.png';

import api from '../services/api';

interface OrphanageItemState {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageItemState[]>([]);

  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToOrphanDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        provider={PROVIDER_GOOGLE} // Definir o mapa do google como default p/ android e IOS;
        style={styles.map}
        initialRegion={{
          latitude: -1.4211351,
          longitude: -48.4600044,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
              calloutAnchor={{ x: 2.7, y: 0.8 }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={30} color="#fff" />
        </RectButton>
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