import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View, Dimensions, useWindowDimensions, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '../MapPolyterrase';  // Import your Map component
import MapPolyPC from '../MapPolyPC';  // Import your Map component
import {Group} from '@/types/types';
import SideButton from '../SideButton';
import { Text, TouchableOpacity } from 'react-native';
import MModal from '../modal/MModal';
import { fonts } from '@/app/theme';
import { useAuth } from '@/app/context/AuthContext';
import GroupButton from '../GroupButton';
import {IconButton } from 'react-native-paper';
import { colors } from '../../app/theme';
import ImageZoom from 'react-native-image-pan-zoom';
import {toggleTable, getTablesOfGroup} from "@/modules/firebase/tableAccess"
import Icon from 'react-native-vector-icons/FontAwesome';

function getAspectRatioSize({ aspectRatio, width }: { aspectRatio: number; width: number }) {
  return {
    width,
    height: width / aspectRatio,
  };
}

export default function Polymensa() {
  const { height, width } = useWindowDimensions();
  const {user ,setCurrentGroup} = useAuth();
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const[selected, setSelected] = React.useState<number[]>([]);
  const handleGroupSelect = (groupID: number) => {
    setCurrentGroup(groupID);
    setIsModalVisible(false);
  };


  useEffect(() => {
      getTablesOfGroup(user?.currentGroup || -1).then((tables) => {
      setSelected(tables);
    })}, [user?.currentGroup]);

  const handleAreaPress = (i : number) => {
    toggleTable(i, user?.currentGroup || -1).then((tables) => {
      getTablesOfGroup(user?.currentGroup || -1).then((tables) => {
        setSelected(tables);
        }
    )});
  };

  let areas = [];
  for (let i = 0; i < 100; i+=5) {
    for (let j = 0; j < 100; j+=5) {
      areas.push({y: i, x: j});
    }
  }


  ///getGroup -> fetch all groups tables with group id
  ///add Point -> add points to group table list
  ///remove Point -> remove points from group table list



  const resolution = [834, 1201];  // The original resolution of the image

  // Utility function to maintain aspect ratio
  const imageSize = getAspectRatioSize({
    aspectRatio: resolution[0] / resolution[1],
    width,
  });

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
      <View style={styles.imageContainer}>
        <Image
        source={require('@/assets/images/polyterrase.jpg')}
        style={imageSize}
      />
       
        {areas.map((area, index) => (
          <TouchableOpacity key={index} style={[styles.touchableArea, {left: `${area.x}%`, top: `${area.y}%`}]} onPress={() => handleAreaPress(index)}>
          {selected.includes(index) && <IconButton key={index} icon="map-marker" style={styles.iconButton} size={50} iconColor="red" onPress={() => handleAreaPress(index)} />}
          </TouchableOpacity>
        ))} 
      </View>
      
      
      {/* Positioning the button over the map */}
      <GroupButton setIsModalVisible={setIsModalVisible}/>
      <TouchableOpacity
        style={[
          styles.circle,
        ]}
        onPress={() => getTablesOfGroup(user?.currentGroup || -1).then((tables) => {
          setSelected(tables);
        })}
      >
        <Icon name="refresh" size={20} color="#FFFF" />
    </TouchableOpacity>
      
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  circle :{
    backgroundColor: '#eb4034',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    left: 20

  },
  imageContainer: {
    marginTop : 25,
    position: 'relative',
    alignItems: 'center',
  },
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
  }, touchableArea: {
    position: 'absolute',
    borderRadius: 5000,
    width: '5%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    color: 'blue', 
  },
});
