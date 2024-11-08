import { collection, addDoc, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const AddMessage = async (conversationId, message) => {
  try {
   
    const messagesRef = collection(db, "conversations", conversationId, "messages");
    await addDoc(messagesRef, {
      ...message,
      timestamp: serverTimestamp(),
    });
    const conversationRef = doc(db, "conversations", conversationId);
    await setDoc(conversationRef, {
      lastMessage: {
        message: message.message,
        senderId: message.senderId,
        timestamp: serverTimestamp(),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};