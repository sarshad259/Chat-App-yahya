import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYBfqb4svu_XXusPGlGSg46-rTWLXWop4",
    authDomain: "chat-app-5c1a6.firebaseapp.com",
    projectId: "chat-app-5c1a6",
    storageBucket: "chat-app-5c1a6.firebasestorage.app",
    messagingSenderId: "696304026861",
    appId: "1:696304026861:web:75671f92bd5592060938e4",
    measurementId: "G-VCP46RBGC7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);