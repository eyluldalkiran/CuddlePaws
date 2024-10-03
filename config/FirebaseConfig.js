// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_KEY,
  authDomain: "quizas-fad90.firebaseapp.com",
  databaseURL: "https://quizas-fad90-default-rtdb.firebaseio.com",
  projectId: "quizas-fad90",
  storageBucket: "quizas-fad90.appspot.com",
  messagingSenderId: "461765843258",
  appId: "1:461765843258:web:589036c97f88273bf15803",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
