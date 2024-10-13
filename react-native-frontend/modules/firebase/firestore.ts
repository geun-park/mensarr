import { app } from "./config";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

export const db = getFirestore(app);

export const getFromFirestore = async (table: string, id: string) => {
    const docRef = doc(db, table, id);
    const docSnap = (await getDoc(docRef));

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
    // docSnap.data() will be undefined in this case
        return undefined;
    }
}

export const getAllFromFirestore = async (table: string) => {
    return await getDocs(collection(db, table));
}
