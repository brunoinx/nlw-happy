import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBackToHomePage() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={ styles.container }>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15bdd6"/>
      </BorderlessButton>

      <Text style={ styles.title }>{title}</Text>

      { showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 44,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafc',
    borderColor: '#dde3f8',
    borderBottomWidth: 2,
    borderRadius: 8,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: '#8fa7b3',
  },
});

export default Header;
