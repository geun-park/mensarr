import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapPolyterrase from '../MapPolyterrase';  // Import your Map component
import PopupMenu from '../PopUpMenu';  // Import PopupMenu component
import SideButton from '../SideButton';

export default function Polymensa() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <MapPolyterrase />

      {/* Positioning the button over the map */}
      <SideButton style={styles.menuButton} />
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
});
