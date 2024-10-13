import { Group } from "@/types/types"
import { getGroupById } from "./groupAccess";


export const toggleTable = async (table: number, groupId: number) => {
    const group = await getGroupById(groupId);
}