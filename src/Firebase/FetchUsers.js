import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";

export const FetchUsers = (callback) => {
  const usersCollectionRef = collection(db, "users");
  
  return onSnapshot(usersCollectionRef, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    callback(users);
  }, (error) => {
    console.log("Error fetching real-time data:", error);
  });
};