import * as React from 'react';
import { StyleSheet , TouchableOpacity} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';

const SideButton = () => (
  <TouchableOpacity 
    style={styles.circle} 
    onPress={() => console.log('Pressed')}
  />


);

export default SideButton;

const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#eb4034',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 50,

        
        // bottom: 10,
        // right: 10,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end'
    }
})