import { Group } from "@/types/types"
import { getGroupById } from "./groupAccess";
import { db, getFromFirestore } from "./firestore";
import { doc, updateDoc } from "firebase/firestore";


export const toggleTable = async (table: number, groupId: number) => {
    const groupData = await getFromFirestore("Groups", groupId.toString());
    if(groupData === undefined)return false;
    const fetchedTables = groupData.locations;
    if(fetchedTables.includes(table)) {
        const index = fetchedTables.indexOf(table);
        fetchedTables.splice(index, 1);
    }else {
        fetchedTables.push(table);
    }
    const docRef = doc(db, 'Groups', groupId.toString());
    await updateDoc(docRef, {
        locations: fetchedTables
    });
    return true;
}

export const getTablesOfGroup = async (groupId: number) => {
    const groupData = await getFromFirestore("Groups", groupId.toString());
    if(groupData === undefined)return [];
    return groupData.locations;
}