import { Group } from "@/types/types";
import { db, getAllFromFirestore, getFromFirestore } from "./firestore";
import { getMultipleUserIds, getUserId } from "./userAccess";
import { DocumentData, doc, setDoc, updateDoc } from "firebase/firestore";


export const getGroupById = async (id: number): Promise<Group | undefined> => {
    const groupData = await getFromFirestore("Groups", id.toString());
    if(groupData == undefined)return undefined;
    return await formatGroup(id, groupData);
}

export const addGroup = async (groupName: string, userNames: string[]) => {
    const allGroups = await getAllFromFirestore("Groups");

    let id = 1;
    allGroups.forEach((value) => {
        if(Number(value.id) >= id)id = Number(value.id) + 1;
    })

    await setDoc(doc(db, "Groups", id.toString()), {
        groupName: groupName,
        userNames: userNames,
        locations: []
      });
}

export const addSingleMember = async (groupId: number, userName: string) => {
    const group = await getGroupById(groupId);
    const docRef = doc(db, 'Groups', groupId.toString());
    const userId = await getUserId(userName)
    if(group === undefined || group.userNames.includes(userName) || userId === undefined)return false;
    
    group.userNames.push(userName)
    await updateDoc(docRef, {
        userNames: group.userNames
    });
    return true;
}

export const addMultipleMembers = async (groupId: number, userNames: string[]) => {
    const group = await getGroupById(groupId);
    const docRef = doc(db, 'Groups', groupId.toString());
    if(group == undefined)return false;

    let changed: boolean = false;
    userNames.forEach((userName: string) => {
        if(!group.userNames.includes(userName)) {
            group.userNames.push(userName);
            changed = true;
        }
    })
    if(!changed)return false;
    await updateDoc(docRef, {
        userNames: group.userNames
    });
    return true;
}

export const removeSingleMember = async (groupId: number, userName: string) => {
    const group = await getGroupById(groupId);
    const docRef = doc(db, 'Groups', groupId.toString());
    const userId = await getUserId(userName)
    if(group === undefined || !group.userNames.includes(userName) || userId === undefined)return false;
    
    const index = group.userNames.indexOf(userName);
    group.userNames = group.userNames.splice(index, index)
    await updateDoc(docRef, {
        userNames: group.userNames
    });
    return true;
}



export const formatGroup = async (id: number, groupData: DocumentData): Promise<Group | undefined> => {
    const groupName = groupData.groupName;
    const userNames = groupData.userNames;
    const userIds: (number | undefined)[] = await getMultipleUserIds(groupData.userNames)
    if(userIds.includes(undefined))return undefined;

    return {
        groupID: id,
        groupName: groupName,
        userNames: userNames,
        userIDs: userIds as number[]
    }
}