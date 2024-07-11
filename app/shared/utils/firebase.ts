import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsZ0WJ537nrmcUT77HzHPA2MCuHkorXbo",
  authDomain: "ecopoints-778b9.firebaseapp.com",
  projectId: "ecopoints-778b9",
  storageBucket: "ecopoints-778b9.appspot.com",
  messagingSenderId: "612866664185",
  appId: "1:612866664185:web:0438f7e4e327c764f0e428"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth,db, storage };