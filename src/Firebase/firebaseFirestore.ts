import { app } from "./firebaseConfig";
import {
    doc,
    getFirestore,
    setDoc
  } from "firebase/firestore";

type UserType = {
    email: string;
    rollNumber: string;
    studentName: string;
    uid: string;
  };
  
  export const db = getFirestore(app);
  
  export async function saveUser(user: UserType) {
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, user);
    } catch (error) {
      console.log(error);
    }
  }