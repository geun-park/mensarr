import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { colors } from '../theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          
          
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen 
        name="groups"
        options={{
          headerStyle: { backgroundColor: colors.primary },
          
          title: 'Manage your Groups',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="group" color={color} />,
        }}
      />
    </Tabs>
  );
}