// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC_mlSh_6OoqgydUbfhFPpXEBAQjcBNNiM",
    authDomain: "albimostore.firebaseapp.com",
    projectId: "albimostore",
    storageBucket: "albimostore.firebasestorage.app",
    messagingSenderId: "609426144482",
    appId: "1:609426144482:web:fa6c9107832ea6ff4d72bb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const cloudinaryConfig = {
    cloudName: "diutiwqz1",
    uploadPreset: "albimostore"
};
