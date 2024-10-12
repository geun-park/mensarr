import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Define the type for your stack's parameters
type RootStackParamList = {
  MensaMenu: undefined;
  Polymensa: undefined;
  ObereUZH: undefined;
  UntereUZH: undefined;
  Polysnack: undefined;
  Foodlab: undefined;
  Tannenbar: undefined;
  ZweisteinBqm: undefined;
};

// Define the type for the navigation prop in MensaMenu
type MensaMenuScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MensaMenu'
>;

// MensaMenu comp
  // List of Mensa with their names and navigation target
  

// Define the MensaMenu component with navigation prop typed


export default function MensaMenu({ navigation }: { navigation: MensaMenuScreenNavigationProp }) {

  const mensas = [
    { name: 'Polymensa', route: 'Polymensa' },
    { name: 'Obere UZH', route: 'ObereUZH' },
    { name: 'Untere UZH', route: 'UntereUZH' },
    { name: 'Polysnack', route: 'Polysnack' },
    { name: 'Foodlab', route: 'Foodlab' },
    { name: 'Tannenbar', route: 'Tannenbar' },
    { name: 'Zweistein/Bqm', route: 'ZweisteinBqm' },
  ];
  
  return (
      <ScrollView contentContainerStyle={styles.container}>
        {mensas.map((mensa, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(mensa.route as keyof RootStackParamList)}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
              style={styles.image}
            />
            <Text style={styles.text}>{mensa.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 160,
    height: 200,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
});