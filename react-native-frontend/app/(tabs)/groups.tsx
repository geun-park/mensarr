import GroupCard from '@/components/groups/GroupCard';
import { Group } from '@/types/GroupTypes';
import { View, Text, ListRenderItem, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const groups:Group[] = [
  { groupID: 1,
    groupName: "babas",
    userIDs: [123,124,125],
    userNames: ['Tom', 'Michael', 'Pascale'] },
    { groupID: 2,
      groupName: "zucker",
      userIDs: [12,13,14],
      userNames: ['Fas', 'Geun', 'Ryo'] }
];

export default function Tab() {
  return (
    <View>
      <Text>Da ist gar kein Zucker drinne</Text>
      
      <FlatList
        data={groups}
        renderItem={GroupCard}
        keyExtractor={item => item.groupID.toString()}
      />
    </View>
  );
}