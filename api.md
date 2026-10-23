// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq5rhXDgiz139kpK0LNk4pEOC_kpaTyME",
  authDomain: "leovantage-website-admin.firebaseapp.com",
  projectId: "leovantage-website-admin",
  storageBucket: "leovantage-website-admin.firebasestorage.app",
  messagingSenderId: "38193399854",
  appId: "1:38193399854:web:32824e41337c743b9d37bf",
  measurementId: "G-RYWZ3YBM2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);