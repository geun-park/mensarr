import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Slot } from 'expo-router';
import Groups from './Groups'; // Updated to ES import

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === 'Home') {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === 'Groups') {
              iconName = focused ? 'people' : 'people-outline';
            }

            return <Ionicons  size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => <Slot />} 
        </Tab.Screen>
        
        <Tab.Screen name="Groups" component={Groups} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
