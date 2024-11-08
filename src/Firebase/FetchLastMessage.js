import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";

export const FetchLastMessage = (conversationId, callback) => {
  const conversationDocRef = doc(db, "conversations", conversationId);

  const unsubscribe = onSnapshot(conversationDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const lastMessage = docSnap.data();
      callback(lastMessage); 
    } else {
      callback(null);
    }
  }, (error) => {
    throw error;
  });

  return unsubscribe;
};