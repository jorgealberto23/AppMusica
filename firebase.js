import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI1U70uWt18lMJJG85ct3wd9vyqedT4zQ",
  authDomain: "appmusic-c9ee0.firebaseapp.com",
  projectId: "appmusic-c9ee0",
  storageBucket: "appmusic-c9ee0.appspot.com",
  messagingSenderId: "382025030135",
  appId: "1:382025030135:web:0c04686c2c81ed62adf6f2",
  measurementId: "G-C4N931HTL0"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)