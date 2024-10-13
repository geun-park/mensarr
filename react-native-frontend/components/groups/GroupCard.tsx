import { Group } from "@/types/types";
import { useState } from "react";
import { ListRenderItem, View, StyleSheet, Alert, Text, Modal, TouchableOpacity } from "react-native"
import { List, Provider, Menu } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import { colors } from "@/app/theme";
import EmojiPicker from "./TimePopover";
import MModal from "../modal/MModal";

interface Props {
    group: Group
}

const inviteLink = "https://localhost:8081/api/joinGroup/"

const exitGroup = (groupID: number) => {
    Alert.alert("Gruppe verlassen", "Du hast die Gruppe erfolgreich verlassen")
}

const copyToClipboard = (groupID: number) => {
    Clipboard.setString(inviteLink + groupID);
    Alert.alert("Link kopiert", "Der Link wurde in die Zwischenablage kopiert.");
}

const GroupCard = ({group}: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const handlePress = () => setExpanded(!expanded);
    const colorStyle = expanded ? colors.textPrimary : "black";

    return(
        <View>
            <MModal isModalVisible={isModalVisible}>
                <Text style={styles.title}>Title</Text>
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
                    </TouchableOpacity>
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
                )}>
                    {
                        //Zeit, Gruppe verlassen
                    }
                    <List.Item title="Einladungslink kopieren" onPress={() => {copyToClipboard(group.groupID)}} left={props => <List.Icon {...props} icon="share" />}/>
                    <List.Item title="Zeit ändern" onPress={() => {setIsModalVisible(true)}}/>
                    <List.Item title="Gruppe verlassen" titleStyle={{color: "red"}}  onPress={() => {exitGroup(group.groupID)}}left={() => <List.Icon style={{paddingLeft: 20}} color="red" icon="exit-to-app" />}/>
                </List.Accordion>
            </View>
        )}


export default GroupCard;



const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
