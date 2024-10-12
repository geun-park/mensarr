import { Group } from "@/types/types";
import { ListRenderItem, View } from "react-native"
import { List } from "react-native-paper";

const GroupCard: ListRenderItem<Group> = ({ item }) => {
     return(
        <List.Item
            title={item.groupName}
            description={`Users: ${item.userNames.join(', ')}`}
            left={(props: { color: string;  style: object }) => (
        <List.Icon {...props} icon="account-group" />
        )}
    />
)}


export default GroupCard;
