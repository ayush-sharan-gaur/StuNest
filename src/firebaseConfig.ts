// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCx7EM5Ct2d0AcOlyrAZ9y2ep-ORxmOZhY",
  authDomain: "stunest-5919.firebaseapp.com",
  projectId: "stunest-5919",
  storageBucket: "stunest-5919.appspot.com", // Corrected storage bucket format
  messagingSenderId: "733444090359",
  appId: "1:733444090359:web:67ef76768e34e063fd66f2",
  // measurementId: "G-GR069J3NDZ"  // omitted for React Native
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
