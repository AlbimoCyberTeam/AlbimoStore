// Konfigurasi Firebase SDK v10+
import { initializeApp } from "https://gstatic.com";
import { getAuth } from "https://gstatic.com";
import { getFirestore } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyC_mlSh_6OoqgydUbfhFPpXEBAQjcBNNiM",
  authDomain: "albimostore.firebaseapp.com",
  databaseURL: "https://albimostore-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "albimostore",
  storageBucket: "albimostore.firebasestorage.app",
  messagingSenderId: "609426144482",
  appId: "1:609426144482:web:fa6c9107832ea6ff4d72bb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
