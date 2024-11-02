// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDF_RIpPkvrP-98bXVzUlakY8nt06Nl_8w",
  authDomain: "tarefasplus-c95bd.firebaseapp.com",
  projectId: "tarefasplus-c95bd",
  storageBucket: "tarefasplus-c95bd.firebasestorage.app",
  messagingSenderId: "46852208202",
  appId: "1:46852208202:web:74a82295019ab693d898b3",
  measurementId: "G-YCVQ4V49R8"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);

export { db };