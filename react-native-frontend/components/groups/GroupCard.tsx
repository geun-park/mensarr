import { Group } from "@/types/types";
import { useState } from "react";
import { ListRenderItem, View, StyleSheet, Alert, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Button, TextInput } from "react-native";
import { List, Provider, Menu } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import { colors, fonts, spacing, borderRadius } from "@/app/theme";
import MModal from "../modal/MModal";
import NumberSlider from "./NumberSlider";

import SideButton from "../SideButton";

interface Props {
    group: Group
}

const exitGroup = (groupID: number) => {
    Alert.alert("Gruppe verlassen", "Du hast die Gruppe erfolgreich verlassen")
}

const GroupCard = ({group}: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isTeamModalVisible, setIsTeamModalVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const handlePress = () => setExpanded(!expanded);
    const colorStyle = expanded ? colors.textPrimary : "black";
    const [success, setSuccess] = useState<number>(0);

    const [selectedNumber, setSelectedNumber] = useState<number>(30);
 
    const handleValueChange = (value: number) => {
      setSelectedNumber(value);
    };


    function handleAddMember() {
        //API SHIT -->

        setSuccess(2)
        setUsername("");
    }
    return (
        <View style={styles.container}>
            <MModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
                <Text style={styles.title}>How many minutes are you staying?</Text>
                <View style={styles.sliderContainer}>
                  <NumberSlider initialValue={selectedNumber} onValueChange={handleValueChange} />
                </View>
            </MModal>

            <MModal isModalVisible={isTeamModalVisible} setIsModalVisible={setIsTeamModalVisible}>
                <Text style={styles.title}>Add member by username</Text>
                <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                  />

                   <TouchableOpacity style={styles.loginButton} onPress={handleAddMember}>
                      <Text style={styles.loginButtonText}>ADD</Text>
                    </TouchableOpacity>
                    {success === 1 && <Text style={styles.successText}>Success!</Text>}
                    {success === 2 && <Text style={styles.errorText}>Error!</Text>}
                  </View>
            </MModal>

            <List.Accordion
                onPress={handlePress}
                title={group.groupName}
                titleStyle={{
                    fontSize: 25,
                    color: colorStyle
                }}
                style={{
                    padding: 20,
                }}
                description={`Member: ${group.userNames.join(', ')}`}
                left={() => (
                    <List.Icon color={colorStyle} icon="account-group" />
                )}
            >
                <List.Item title="Add members" onPress={() => { setIsTeamModalVisible(true) }} left={props => <List.Icon {...props} icon="account-plus" />} />
                <List.Item title={selectedNumber + " min"} onPress={() => { setIsModalVisible(true) }} left={props => <List.Icon {...props} icon="clock-time-seven-outline"/>}  right={() => <Text style={styles.editButton}>EDIT</Text>} />
                <List.Item title="Leave group" titleStyle={{ color: "red" }} onPress={() => { exitGroup(group.groupID) }} left={() => <List.Icon style={{ paddingLeft: 20 }} color="red" icon="exit-to-app" />} />
            </List.Accordion>
        </View>
    );
}

export default GroupCard;

const styles = StyleSheet.create({
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: fonts.sizeMedium,
    
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    alignItems: 'center',
    width: '80%', // Set width to 80% to make it narrower than the input fields
    maxWidth: 320, // Set a maximum width for the login button
  },
  container: {
    margin: 5,
    borderRadius: 10,
    
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    marginBottom: spacing.medium,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    fontSize: fonts.sizeMedium,
    color: colors.textPrimary,
    width: '100%', // Set width to 100% to fill the container
    maxWidth: 400, // Set a maximum width for the input fields
  },
  editButton: {
    color: "black",
    fontSize: 16,
    marginRight: 0,
  },
  selectedNumber: {
    fontSize: 16,
    color: 'black',
    marginRight: 200,
  },
    sliderContainer: {
      marginVertical: 0,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
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
        // Shadow properties for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        // Elevation for Android
        elevation: 5,
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