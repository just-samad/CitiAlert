import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDT9CUCsXzujH_-wX4jcntZtV3YHpBdZds",
  authDomain: "civicpulseapp-34295.firebaseapp.com",
  projectId: "civicpulseapp-34295",
  storageBucket: "civicpulseapp-34295.appspot.com",
  messagingSenderId: "959032726537",
  appId: "1:959032726537:web:26054b42177766c22d54d8",
  measurementId: "G-Z97W4PDJLQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
