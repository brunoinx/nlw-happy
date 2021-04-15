import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// componentes
import Header from './components/Header';

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
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap}
        />

        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={ false } title="Detalhes do orfanato"/>
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Posição no mapa" />
          }}
        />

        <Screen 
          name="OrphanageData" 
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Cadastro do orfanato" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}