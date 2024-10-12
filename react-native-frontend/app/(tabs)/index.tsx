import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '@/components/MapPolyterrase';
import SideButton from '@/components/SideButton'

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>

  </GestureHandlerRootView>
);

export default function Tab() {
  return (
    <View style={{flex:1}}>
      <MapPolyterrase/>
      <SideButton>
      </SideButton>

    </View>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });