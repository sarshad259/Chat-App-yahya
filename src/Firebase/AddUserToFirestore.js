import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const addUserToFirestore = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};