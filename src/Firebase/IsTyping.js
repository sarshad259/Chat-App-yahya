import { collection, addDoc, doc, updateDoc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const IsTyping = async (conversationId , status) => {
  try {
    const conversationRef = doc(db, "conversations", conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      await updateDoc(conversationRef, {
        isTyping: status,
      });
    } else {
      await setDoc(conversationRef, {
        isTyping: status,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};