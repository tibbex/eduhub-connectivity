
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBh-5MUfipNlh3GviuAAPl9Lmuoxl2ex_o",
  authDomain: "eduhub-cd716.firebaseapp.com",
  projectId: "eduhub-cd716",
  storageBucket: "eduhub-cd716.firebasestorage.app",
  messagingSenderId: "1074135331896",
  appId: "1:1074135331896:web:14b0ba03f9567417dc22cd",
  measurementId: "G-EM0FE6JJWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication functions
export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    // Set persistence based on rememberMe
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { auth, db, storage };
