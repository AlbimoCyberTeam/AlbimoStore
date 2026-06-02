// firebase/config.js
import { initializeApp } from "https://gstatic.com";
import { getAuth } from "https://gstatic.com";
import { getFirestore } from "https://gstatic.com";

// Ganti dengan konfigurasi asli dari Firebase Console Anda
const firebaseConfig = {
    apiKey: "AIzaSyC_mlSh_6OoqgydUbfhFPpXEBAQjcBNNiM",
    authDomain: "albimostore.firebaseapp.com",
    projectId: "albimostore",
    storageBucket: "albimostore.firebasestorage.app",
    messagingSenderId: "609426144482",
    appId: "1:609426144482:web:fa6c9107832ea6ff4d72bb"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Konfigurasi Cloudinary (untuk upload gambar)
export const cloudinaryConfig = {
    cloudName: "diutiwqz1",
    uploadPreset: "albimostore" // Pastikan mode 'unsigned' aktif di Cloudinary
};
