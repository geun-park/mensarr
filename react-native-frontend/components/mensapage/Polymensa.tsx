import { View, Text, StyleSheet , Dimensions} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '@/components/MapPolyterrase';
import SideButton from '@/components/SideButton'
import PopupMenu from '../PopUpMenu';

const { width, height } = Dimensions.get('window');

export default function Polymensa() {
  return (
    <GestureHandlerRootView>
    <View >
      {/* <MapPolyterrase style={styles.map}/> */}

      <PopupMenu style={styles.menubutton}/>
      {/* <SideButton>
      </SideButton> */}
    </View>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    width: width,
    height: height,

  },
  map: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    bottom: 0,
    width: width,
    height: height,
  },
  menubutton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }

})