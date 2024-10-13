import * as React from 'react';
import { StyleSheet ,Text, TouchableOpacity, Animated, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';


// import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB,  } from 'react-native-paper';
import { PropsWithChildren } from 'react';
interface SidebuttonProps {
    setIsModalVisible: (visible: boolean) => void;
  }

const SideButton: React.FC<SidebuttonProps> = ({ setIsModalVisible }) => {
    return(
    <TouchableOpacity style={styles.circle} onPress={() => setIsModalVisible(true)}>
    <Icon name="group" size={20} color="#FFFF"/>
</TouchableOpacity>)
  };

export default SideButton;

const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#eb4034',
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        right: 20

        
        // bottom: 10,
        // right: 10,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end'
    }
})