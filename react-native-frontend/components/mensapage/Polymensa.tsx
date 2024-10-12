import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '@/components/MapPolyterrase';
import SideButton from '@/components/SideButton'



export default function Polymensa() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={{flex:1}}>
      <MapPolyterrase/>
      <SideButton>
      </SideButton>

    </View>
    </GestureHandlerRootView>
    
  );
}