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
    currentIsPublic: boolean,
    assignedGroups: Array<Group>,
    
}