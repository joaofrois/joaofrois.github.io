// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkC1q6AAVeOHihy4DMOPKx1y18r1o4jzQ",
  authDomain: "pokexpandit.firebaseapp.com",
  projectId: "pokexpandit",
  storageBucket: "pokexpandit.appspot.com",
  messagingSenderId: "1045700257336",
  appId: "1:1045700257336:web:2d8f428a79391654b068cd",
  measurementId: "G-B2T3TFVSGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);