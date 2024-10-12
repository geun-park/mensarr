import GroupCard from '@/components/groups/GroupCard';
import { Group } from '@/types/types';
import { View, Text, ListRenderItem, FlatList, StyleSheet } from 'react-native';
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
      <FlatList
        contentContainerStyle={styles.container}
        data={groups}
        renderItem={({item}) => <GroupCard group={item} />}
        keyExtractor={item => item.groupID.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

const renderGroup: ListRenderItem<Group> = ({ item }) => (
  <List.Item
  title={item.groupName}
  description={`Users: ${item.userNames.join(', ')}`}
  left={(props: { color: string;  style: object }) => (
    <List.Icon {...props} icon="account-group" />
  )}
/>
);