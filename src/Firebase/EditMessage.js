import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const EditMessage = async (conversationId, messageId, newMessage) => {
  try {
    const messageRef = doc(db, "conversations", conversationId, "messages", messageId);
    const placeholder = prompt("Enter new message:", newMessage);
    if (placeholder === null) return; // User cancelled
    
    await updateDoc(messageRef, {
      message: placeholder,
      edited: true,
      editedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error editing message:", error);
    throw new Error(error);
  }
};
