import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPeWCEZWt_6iylzbczSB6Mpz-20GwCFEc",
  authDomain: "olxclone-6abd7.firebaseapp.com",
  projectId: "olxclone-6abd7",
  storageBucket: "olxclone-6abd7.appspot.com",
  messagingSenderId: "185230786457",
  appId: "1:185230786457:web:dc9d8cb35c3e3cddf89d08"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);