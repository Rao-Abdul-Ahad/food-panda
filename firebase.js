import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, updateDoc, deleteDoc, where } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpMFsbbB-P-PXWAGaChiHIXoDh8LiRC9w",
    authDomain: "sign-in-and-sign-up-335b4.firebaseapp.com",
    projectId: "sign-in-and-sign-up-335b4",
    storageBucket: "sign-in-and-sign-up-335b4.firebasestorage.app",
    messagingSenderId: "832961840852",
    appId: "1:832961840852:web:6d963abfb8f9de9fef5d41",
    measurementId: "G-XVVF0TPN0Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, db, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, updateDoc, deleteDoc, where };