// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmxtCMAgk49U75XCiIhrAeL3yBASi5GaE",
  authDomain: "react-social-media-5f6e8.firebaseapp.com",
  projectId: "react-social-media-5f6e8",
  storageBucket: "react-social-media-5f6e8.appspot.com",
  messagingSenderId: "150189263479",
  appId: "1:150189263479:web:7e593d7b1a797425e0d472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();