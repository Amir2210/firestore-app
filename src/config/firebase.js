// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO5SmA9TNZZHRu0Rpnq_uGTPEnJwviKUg",
  authDomain: "simpleapp-68ad2.firebaseapp.com",
  projectId: "simpleapp-68ad2",
  storageBucket: "simpleapp-68ad2.firebasestorage.app",
  messagingSenderId: "408948727851",
  appId: "1:408948727851:web:056ad6478af25cde678a6e",
  measurementId: "G-E6LZ4E3QD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dbFireStore = getFirestore()