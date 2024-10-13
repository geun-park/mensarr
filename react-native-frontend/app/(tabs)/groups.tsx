import * as React from 'react';
import GroupCard from '@/components/groups/GroupCard';
import MModal from '@/components/modal/MModal';
import SideButton from '@/components/SideButton';
import { Group } from '@/types/types';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, List } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { getGroupsOfUser } from '@/modules/firebase/userAccess';
import { addGroup } from '@/modules/firebase/groupAccess';
import { colors, fonts, spacing, borderRadius } from "@/app/theme";


export default function Tab() {

  const{user} = useAuth()

  async function handleConfirm () {
    console.log('User:', user);
    if(!user)return;
    await addGroup(text, [user.name])
        setText("");
        setSuccess(1);
    
  }
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  React.useEffect(() => {
    setSuccess(0);
    if(user == undefined)return;
    getGroupsOfUser(user.name).then((result: Group[]) => {
      setGroups(result)
    })
  }, [isModalVisible])

  // modal button
 

  // input group name 
  const InputAccessoryViewID = 'uniqueID'
  const initialText = '';
  const [text, setText] = useState(initialText);
  const[success, setSuccess] = useState<number>(0);

  // checkbox

  return (
    <View style={{flex:1}}>
      <MModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
                <Text style={styles.title}>Add Group</Text>
                <Text style={styles.desc}>Name of Group</Text>
                <View style={styles.input}>
                  <TextInput 
                    // style={{padding: 16, margin: 50}} 
                    
                    inputAccessoryViewID={InputAccessoryViewID}
                    onChangeText={setText}
                    value={text}
                    placeholder='Enter group name here...'
                    />
                </View>

                

                {/* confirm and cancel buttons */}
                <View style={styles.buttonView}>
                  <TouchableOpacity
                      style={[
                          styles.button,
                          {
                          width: "100%",
                          marginTop: 24,
                          backgroundColor: "green",
                          },
                      ]}
                      onPress={() => handleConfirm()}
                  > 
                      <Text style={[styles.text, { color: "white" }]}>Confirm</Text>
                  </TouchableOpacity>
                </View>
                {success === 1 && <Text >Success!</Text>}
            </MModal>
      <FlatList
        contentContainerStyle={styles.container}
        data={groups}
        renderItem={({item}) => <GroupCard group={item} setGroups={setGroups} groups={groups}/>}
        keyExtractor={item => item.groupID.toString()}
      />
      <SideButton onPress={() => setIsModalVisible(true)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 15,
    
  },
  menuButton: {
    position: 'absolute',
    bottom: 20, // Position the button near the bottom of the screen
    right: 20,  // Position it on the right
  },
  desc: {
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.7,
    marginBottom: 5
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
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
  buttonView: {
    // flexDirection: 'row',

    
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginTop: 6,
    marginBottom: 14,
    fontSize: 20
  },
  input: {

    backgroundColor: '#fff',
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    marginTop: 8,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    fontSize: fonts.sizeMedium,
    color: colors.textPrimary,
    width: '100%', // Set width to 100% to fill the container
     // Set a maximum width for the input fields
  },

  
  list: {
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.7,
    padding: 5,
    // flexDirection: 'row'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  checkBox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20
  }
});
