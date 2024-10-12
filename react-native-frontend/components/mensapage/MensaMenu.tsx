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
    { name: 'Polymensa', route: 'Polymensa' , image:require('../../assets/images/Polymensa_menu.jpg')},
    { name: 'Obere UZH', route: 'ObereUZH' , image:require('../../assets/images/ObereUZH_menu.jpeg')},
    { name: 'Untere UZH', route: 'UntereUZH',image:require('../../assets/images/UntereUZH_menu.jpg') },
    { name: 'Polysnack', route: 'Polysnack' , image:require('../../assets/images/Polysnack_menu.jpg')},
    { name: 'Foodlab', route: 'Foodlab', image:require('../../assets/images/Foodlab_menu.jpeg')} ,
    { name: 'Tannenbar', route: 'Tannenbar', image:require('../../assets/images/Tannenbar_menu.jpg' )},
    { name: 'Zweistein', route: 'Zweistein' , image:require('../../assets/images/Zweistein_menu.jpeg')},
  ];
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mensas.map((mensa, index) => {
        const imagePath: string = `../../assets/images/${mensa.route}_menu.jpg`;
        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(mensa.route as keyof RootStackParamList)}
          >
            <Image
              source={mensa.image}
              style={styles.image}
              resizeMode='cover'
            />
            <Text style={styles.text}>{mensa.name}</Text>
          </TouchableOpacity>
        );
      })}
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