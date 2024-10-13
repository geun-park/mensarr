import { DocumentData } from "firebase/firestore";
import { getAllFromFirestore, getFromFirestore } from "./firestore";
import { Group } from "@/types/types";
import { formatGroup } from "./groupAccess";

export const getUserId = async (userName: string): Promise<number | undefined> => {
    const data: DocumentData | undefined = await getFromFirestore("User", userName);
    return data ? data.id : data;
}

export const getMultipleUserIds = async (usernames: string[]) => {
    const result = new Array<number | undefined>(usernames.length)
    for(let i = 0; i < usernames.length; i++) {
        result[i] = await getUserId(usernames[i]);
    }
    return result;
}

export const getGroupsOfUser = async (username: string): Promise<Group[]> => {
    const allGroups = getAllFromFirestore("Groups");
    const promises: Promise<Group | undefined>[] = [];
    (await allGroups).forEach((groupDoc: DocumentData) => {
        promises.push(formatGroup(groupDoc.id, groupDoc.data()));
    })
    const groups: (Group | undefined)[] = await Promise.all(promises);
    
    const filtered = groups.filter((entry : Group | undefined) => {
        if(entry == undefined || !((entry as Group).userNames.includes(username)))return false;
        return true;
    })
    return filtered as Group[];
}