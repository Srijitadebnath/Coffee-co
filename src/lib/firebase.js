import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMt8tU2DRptkv2s4nwFgIL1wipZBevKIo",
    authDomain: "coffee-co-761ac.firebaseapp.com",
    projectId: "coffee-co-761ac",
    storageBucket: "coffee-co-761ac.firebasestorage.app",
    messagingSenderId: "52465404470",
    appId: "1:52465404470:web:1b0cc59bfd75b0491d2697"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);