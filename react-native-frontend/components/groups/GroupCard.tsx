import { Group } from "@/types/types";
import { useState } from "react";
import { ListRenderItem, View, StyleSheet, Alert } from "react-native"
import { List, Provider, Menu } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import { colors } from "@/app/theme";

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
    const handlePress = () => setExpanded(!expanded);
    const colorStyle = expanded ? colors.textPrimary : "black";
    return(
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
                <List.Item title="Unterpunkt 2"/>
                <List.Item title="Gruppe verlassen" titleStyle={{color: "red"}}  onPress={() => {exitGroup(group.groupID)}}left={() => <List.Icon style={{paddingLeft: 20}} color="red" icon="exit-to-app" />}/>
            </List.Accordion>
        )}


export default GroupCard;