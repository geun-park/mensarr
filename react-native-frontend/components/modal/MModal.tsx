import { PropsWithChildren, ReactNode } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";

interface Props{
    isModalVisible: boolean
    setIsModalVisible: (visible: boolean) => void;
}   
const MModal = (props: PropsWithChildren<Props>) => {
    


    return(
        <Modal visible={props.isModalVisible} transparent={true} animationType="fade" onRequestClose={() => props.setIsModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => props.setIsModalVisible(false)}>
                <View style={styles.content}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.card}>
                            {props.children}
                            <TouchableOpacity
                                        style={[
                                            styles.button,
                                            {
                                                width: "100%",
                                                marginTop: 24,
                                                backgroundColor: "rgba(0,0,0,0.1)",
                                            },
                                        ]}
                                        onPress={() => props.setIsModalVisible(false)}
                                >
                                <Text style={[styles.text, { color: "black" }]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default MModal;

const styles = StyleSheet.create({
    modal:{
        shadowOpacity: 0,
    },
    card: {
      width: "90%",
      padding: 20,
      backgroundColor: "white",
      borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 5,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }, 
    text: {
        fontWeight: "600",
        fontSize: 16,
        color: "black",
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
