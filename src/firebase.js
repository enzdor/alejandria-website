import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDYQ90tCD3oxt-NbBVY_OixEA8C-rPoE7k",
  authDomain: "alejandria-bc496.firebaseapp.com",
  projectId: "alejandria-bc496",
  storageBucket: "alejandria-bc496.appspot.com",
  messagingSenderId: "582668141143",
  appId: "1:582668141143:web:68da4cfd1305cc18531912",
  measurementId: "G-QMXLN67GG8"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
