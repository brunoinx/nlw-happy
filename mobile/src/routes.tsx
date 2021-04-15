import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Busca pelo orfanatos
import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';

// Cadastro dos orfanatos
import SelectMapPosition from './screens/registerOrphanage/SelectMapPosition';
import OrphanageData from './screens/registerOrphanage/OrphanageData';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap}/>
        <Screen name="OrphanageDetails" component={OrphanageDetails}/>

        <Screen name="SelectMapPosition" component={SelectMapPosition}/>
        <Screen name="OrphanageData" component={OrphanageData}/>
      </Navigator>
    </NavigationContainer>
  );
}