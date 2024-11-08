import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const DeleteMessage = async (conversationId, messageId) => {
  try {
    const messageRef = doc(db, "conversations", conversationId, "messages", messageId);
    await updateDoc(messageRef, {
      message:'this messge is deleted',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};