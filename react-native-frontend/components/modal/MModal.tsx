import { PropsWithChildren, ReactNode } from "react";
import { Modal, View, StyleSheet } from "react-native";

interface Props{
    isModalVisible: boolean
}
const MModal = (props: PropsWithChildren<Props>) => {


    return(
        <Modal visible={props.isModalVisible} transparent={true} animationType="slide">
            <View style={styles.content}>
                <View style={styles.card}>
                    {props.children}
                </View>
                </View>
            </Modal>
    )
}

export default MModal;

const styles = StyleSheet.create({
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
    }
  });
