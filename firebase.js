// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo8p7NDkhdyBPfSgMzu4dIaLtk_3SNVTw",
  authDomain: "gr-tracker-f88c6.firebaseapp.com",
  projectId: "gr-tracker-f88c6",
  storageBucket: "gr-tracker-f88c6.appspot.com",
  messagingSenderId: "978979956054",
  appId: "1:978979956054:web:356d79037c69ec1337e2f7",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
