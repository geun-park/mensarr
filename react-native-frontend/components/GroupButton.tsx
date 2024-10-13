import * as React from 'react';
import { StyleSheet ,Text, TouchableOpacity, Animated, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';


// import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB,  } from 'react-native-paper';
import { PropsWithChildren } from 'react';
import { useAuth } from '@/app/context/AuthContext';
interface SidebuttonProps {
    setIsModalVisible: (visible: boolean) => void;
  }

const GroupButton: React.FC<SidebuttonProps> = ({ setIsModalVisible }) => {
  const {user} = useAuth();
    return(
      <TouchableOpacity
      style={[
        styles.circle,
        { backgroundColor: user?.currentIsPublic ? 'green' : 'red' }
      ]}
      onPress={() => setIsModalVisible(true)}
    >
      <Icon name="group" size={20} color="#FFFF" />
    </TouchableOpacity>)
  };

export default GroupButton;

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