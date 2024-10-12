import { Group } from "@/types/GroupTypes";
import { useState } from "react";
import { ListRenderItem, View, StyleSheet, Alert } from "react-native"
import { List, Provider, Menu } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';

interface Props {
    group: Group
}

const inviteLink = "https://localhost:8081/api/joinGroup/"

const copyToClipboard = (groupID: number) => {
    Clipboard.setString(inviteLink + groupID);
    Alert.alert("Link kopiert", "Der Link wurde in die Zwischenablage kopiert.");
}

const GroupCard = ({ group }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    return(
        <List.Accordion
            onPress={handlePress}
            style={styles.item}
            title={group.groupName}
            titleStyle={styles.title}
            description={`Member: ${group.userNames.join(', ')}`}
            left={(props: { color: string;  style: object }) => (
            <List.Icon {...props} icon="account-group" />
            )}>
                <List.Item title="Einladungslink kopieren" onPress={() => {copyToClipboard(group.groupID)}} left={props => <List.Icon {...props} icon="share" />}/>
                <List.Item title="Unterpunkt 2" />
                <List.Item title="Unterpunkt 3" />
            </List.Accordion>
        )
    }


export default GroupCard;

const styles = StyleSheet.create({
    item: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "light-gray",
        margin: 10,
    },
    title: {
        fontSize: 30
    }
});