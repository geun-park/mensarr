import * as React from 'react';
import GroupCard from '@/components/groups/GroupCard';
import MModal from '@/components/modal/MModal';
import SideButton from '@/components/SideButton';
import { Group } from '@/types/types';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, List } from 'react-native-paper';

const groups:Group[] = [
  { groupID: 1,
    groupName: "babas",
    userIDs: [123,124,125],
    userNames: ['Tom', 'Michael', 'Pascale'] },
  { groupID: 2,
    groupName: "zucker",
    userIDs: [12,13,14],
    userNames: ['Fas', 'Geun', 'Ryo'] }
];

export default function Tab() {

  // modal button
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // input group name 
  const InputAccessoryViewID = 'uniqueID'
  const initialText = '';
  const [text, setText] = useState(initialText);

  // checkbox
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);

  return (
    <View style={{flex:1}}>
      <MModal isModalVisible={isModalVisible}>
                <Text style={styles.title}>Add Group</Text>
                <Text style={styles.desc}>Name of Group</Text>
                <View style={styles.textInput}>
                  <TextInput 
                    // style={{padding: 16, margin: 50}} 
                    
                    inputAccessoryViewID={InputAccessoryViewID}
                    onChangeText={setText}
                    value={text}
                    placeholder='Enter group name here...'
                    />
                </View>

                <View style={styles.item}>
                  <Text style={styles.list}>
                    Alex
                  </Text>
                  <View style={styles.checkBox}><Checkbox
                    status={checked1 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked1(!checked1);
                    }}
                  />
                  </View>
                </View>

                <View style={styles.item}>
                  <Text style={styles.list}>
                    Geun
                  </Text>
                  <View style={styles.checkBox}><Checkbox
                    status={checked2 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked2(!checked2);
                    }}
                  />
                  </View>
                </View>

                <View style={styles.item}>
                  <Text style={styles.list}>
                    Jonas
                  </Text>
                  <View style={styles.checkBox}><Checkbox
                    status={checked3 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked3(!checked3);
                    }}
                  />
                  </View>
                </View>

                <View style={styles.item}>
                  <Text style={styles.list}>
                    Roberto
                  </Text>
                  <View style={styles.checkBox}><Checkbox
                    status={checked4 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked4(!checked4);
                    }}
                  />
                  </View>
                </View>

                <View style={styles.item}>
                  <Text style={styles.list}>
                    Ryo
                  </Text>
                  <View style={styles.checkBox}><Checkbox
                    status={checked5 ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked5(!checked5);
                    }}
                  />
                  </View>
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
                      onPress={() => setIsModalVisible(false)}
                  >
                      <Text style={[styles.text, { color: "black" }]}>Confirm</Text>
                  </TouchableOpacity>

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
                  </TouchableOpacity>

                </View>
                  
            </MModal>
      <FlatList
        contentContainerStyle={styles.container}
        data={groups}
        renderItem={({item}) => <GroupCard group={item} />}
        keyExtractor={item => item.groupID.toString()}
      />
      <SideButton onPress={() => setIsModalVisible(true)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
