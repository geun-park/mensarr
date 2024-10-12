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
      {/* <View style={{backgroundColor:"blue",flex:2}}></View>
      <View style={{backgroundColor:"red",flexDirection:"row", flex:0.4}}>
        <View style={{backgroundColor:"orange", flex:2}}></View>
        <View style={{backgroundColor:"purple", flex:0.7, justifyContent: "center",}}>
          <SideButton>
            
          </SideButton>
        </View>
      </View> */}
      {/* <SideButton/> */} 
      
      <MapPolyterrase/>
      {/* <View>
        
      </View> */}
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