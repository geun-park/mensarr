import * as React from 'react';
import { StyleSheet , TouchableOpacity, Animated, View} from 'react-native'
import { Icon } from 'react-native-paper'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';

const SideButton = () => (
    <TouchableOpacity style={styles.circle} onPress={() => console.log('Pressed')}>
            <Icon source="plus" size={50} color="#FFFF"/>
    </TouchableOpacity>

);

export default SideButton;

const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#eb4034',
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 50,
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