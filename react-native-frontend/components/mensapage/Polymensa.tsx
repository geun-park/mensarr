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
import GroupButton from '../GroupButton';

export default function Polymensa() {
  const {user,  setCurrentGroup} = useAuth();
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const handleGroupSelect = (groupID: number) => {
    setCurrentGroup(groupID);
    setIsModalVisible(false);
    
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <MModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} >
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
          
            <Text style={styles.title}>Choose your group</Text>
            <ScrollView style={styles.scrollView}>
              {user?.assignedGroups.map((group) => (
                <TouchableOpacity
                  key={group.groupID}
                  style={styles.groupItem}
                  onPress={() => handleGroupSelect(group.groupID)}
                >
                  {/*currently the UI does not rerender when we change the group as we use no Hook, don't matter however*/}
                  <Text style={styles.groupText}>{group.groupName}</Text>
                  {user?.currentGroup === group.groupID && <Text style={styles.radioButton}>●</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>

            
            <TouchableOpacity
              style={[styles.button, { width: '100%', marginTop: 24, backgroundColor: 'green' }]}
              onPress={() => handleGroupSelect(-1)}
            >
              <Text style={[styles.text, { color: 'white' }]}>Go Public</Text>
            </TouchableOpacity>

            
         
          
        </View>
      </TouchableWithoutFeedback>
      </MModal>
      <MapPolyterrase />
<<<<<<< HEAD

      {/* Positioning the button over the map */}
      <GroupButton setIsModalVisible={setIsModalVisible}/>
      
=======
      <MModal isModalVisible={isModalVisible}>
                {/* <Text style={styles.title}>Add Group</Text>
                <Text style={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto deleniti nemo rerum nulla sint consectetur id esse
                earum officia cupiditate aperiam, laboriosam repellat sapiente
                quam, a quisquam mollitia est quasi.
                </Text>
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                        width: "100%",
                        marginTop: 24,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        },
                    ]}
                    onPress={() => setIsModalVisible(false)}
                >
                  <Text style={[styles.text, { color: "black" }]}>Close</Text>
                </TouchableOpacity> */}
            </MModal>
      <SideButton onPress={() => setIsModalVisible(true)} />
>>>>>>> geun_addgroup
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
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
  text:{
    fontSize: fonts.sizeMedium,
  
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
<<<<<<< HEAD

=======
  desc: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  button: {
    width: "90%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 8,
  },
>>>>>>> geun_addgroup
});
