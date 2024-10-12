import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, IconButton } from "react-native-paper";

const PopupMenu = ({ style }: { style?: any }) => {
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{x: number; y: number}>({ x: 0, y: 0 });

  const openMenu = (event: any) => {
    setMenuPosition({ x: 400, y: 450 });
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <View style={[ style]}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{ x: menuPosition.x, y: menuPosition.y }} // Custom position for the menu
        style={styles.menu}
      >
        <Menu.Item onPress={() => {}} title="Group 1" />
        <Menu.Item onPress={() => {}} title="Group 2" />
        <Menu.Item onPress={() => {}} title="Group 3" />
      </Menu>

      <View style={styles.circle}>
        <IconButton
          icon="plus"
          size={50}
          onPress={openMenu}
          iconColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  circle: {
    backgroundColor: '#b2b6f3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 300,
  }
});

export default PopupMenu;
