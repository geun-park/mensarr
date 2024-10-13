import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapPolyterrase from '@/components/MapPolyterrase';
import SideButton from '@/components/SideButton'
import { Stack } from 'expo-router';
import MensaMenu from '../../components/mensapage/MensaMenu';
import Polymensa from '../../components/mensapage/Polymensa';
import { colors } from '../theme';

const HomeStack = createNativeStackNavigator();

function ObereUZH() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Obere UZH!</Text>
    </View>
  );
}

function UntereUZH() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Untere UZH!</Text>
    </View>
  );
}

function Polysnack() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Polysnack!</Text>
    </View>
  );
}

function Foodlab() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Foodlab!</Text>
    </View>
  );
}

function Tannenbar() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Tannenbar!</Text>
    </View>
  );
}

function Zweistein() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Welcome to Zweistein!</Text>
    </View>
  );
}




export default function Tab() {
  return (
    <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary, // Set the header background color here
      },
      headerTintColor: 'white', // Optional: Set the color of the header text/icons
    }}>
      <HomeStack.Screen name="MensaMenu" component={MensaMenu} />
        <HomeStack.Screen name="Polymensa" component={Polymensa} />
        <HomeStack.Screen name="ObereUZH" component={ObereUZH} />
        <HomeStack.Screen name="UntereUZH" component={UntereUZH} />
        <HomeStack.Screen name="Polysnack" component={Polysnack} />
        <HomeStack.Screen name="Foodlab" component={Foodlab} />
        <HomeStack.Screen name="Tannenbar" component={Tannenbar} />
        <HomeStack.Screen name="Zweistein" component={Zweistein} />
      
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});