import { app } from "@/Firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { saveUser } from "./firebaseFirestore";

export const auth = getAuth(app);

export function signupWithEmailPassword(
  email: string,
  password: string,
  rollNumber: string,
  studentName: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const { email, uid } = userCredential.user;
      console.log("user created successfully.");
      saveUser({ email: email as string, uid, rollNumber, studentName });
      sendEmailVerification(auth.currentUser!).then(() => {
        // Email verification sent!
        // ...
      });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user login successfully", user);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function emailVerification() {
  sendEmailVerification(auth.currentUser!).then(() => {
    // Email verification sent!
    // ...
  });
}

export function signOutAtHome() {
  signOut(auth)
    .then(() => {
      console.log("Signout successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}
