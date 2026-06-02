// firebase/config.js
import { initializeApp } from "https://gstatic.com";
import { getAuth } from "https://gstatic.com";
import { getFirestore } from "https://gstatic.com";

// Ganti dengan konfigurasi asli dari Firebase Console Anda
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "://firebaseapp.com",
    projectId: "your-app",
    storageBucket: "://appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Konfigurasi Cloudinary (untuk upload gambar)
export const cloudinaryConfig = {
    cloudName: "YOUR_CLOUDINARY_NAME",
    uploadPreset: "YOUR_UPLOAD_PRESET" // Pastikan mode 'unsigned' aktif di Cloudinary
};
