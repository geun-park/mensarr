import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '../MapPolyterrase';  // Import your Map component
import PopupMenu from '../PopUpMenu';  // Import PopupMenu component
import SideButton from '../SideButton';
import MModal from '../modal/MModal';
import { Props } from 'react-native-paper';

export default function Polymensa() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <GestureHandlerRootView style={styles.container}>
      <MapPolyterrase />
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    bottom: 20, // Position the button near the bottom of the screen
    right: 20,  // Position it on the right
  },
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
});
