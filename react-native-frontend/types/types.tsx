export interface Group {
    groupID: number,
    groupName: string,
    userIDs: Array<number>,
    userNames: Array<string>,
  };

export interface User {
    name: string,
    userID: number,
    currentGroup: number,
    assignedGroups: Array<number>,
}