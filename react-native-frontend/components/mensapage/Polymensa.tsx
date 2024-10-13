import React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '../MapPolyterrase';  // Import your Map component
import {Group} from '@/types/types';
import SideButton from '../SideButton';
import { Text, TouchableOpacity } from 'react-native';
import MModal from '../modal/MModal';
import { fonts } from '@/app/theme';
import { useAuth } from '@/app/context/AuthContext';

export default function Polymensa() {
  const {user} = useAuth();
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const handleGroupSelect = (group: Group) => {
    if(!user) return;

    user.currentGroup = group.groupID;
    console.log(user.currentGroup);
    setIsModalVisible(false);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <MModal isModalVisible={isModalVisible} >
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
            <Text style={styles.title}>Choose your group</Text>
            <ScrollView style={styles.scrollView}>
              {user?.assignedGroups.map((group) => (
                <TouchableOpacity
                  key={group.groupID}
                  style={styles.groupItem}
                  onPress={() => handleGroupSelect(group)}
                >
                  {/*currently the UI does not rerender when we change the group as we use no Hook, don't matter however*/}
                  <Text style={styles.groupText}>{group.groupName}</Text>
                  {user?.currentGroup === group.groupID && <Text style={styles.radioButton}>●</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>

            
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: '100%',
                  marginTop: 24,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
              ]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={[styles.text, { color: 'black' }]}>Close</Text>
            </TouchableOpacity>
          
        </View>
      </TouchableWithoutFeedback>
      </MModal>
      <MapPolyterrase />

      {/* Positioning the button over the map */}
      <SideButton setIsModalVisible={setIsModalVisible}/>
      
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary,
    marginBottom: 16,
  },
  scrollView: {
    width: '100%',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupText: {
    fontSize: 18,
  },
  radioButton: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});
