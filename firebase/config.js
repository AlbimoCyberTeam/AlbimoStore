// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_mlSh_6OoqgydUbfhFPpXEBAQjcBNNiM",
  authDomain: "albimostore.firebaseapp.com",
  databaseURL: "https://albimostore-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "albimostore",
  storageBucket: "albimostore.firebasestorage.app",
  messagingSenderId: "609426144482",
  appId: "1:609426144482:web:fa6c9107832ea6ff4d72bb"
};

const app = initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
