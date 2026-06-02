// assets/js/auth-guard.js
import { auth, db } from "../../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Fungsi untuk mengamankan halaman berdasarkan role yang diizinkan
export function protectPage(allowedRoles) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            // Jika belum login, tendang ke halaman login root
            window.location.href = "../auth/login.html";
            return;
        }

        // Ambil role pengguna dari Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userRole = userDoc.data().role;

            // Jika role tidak sesuai dengan yang diizinkan di halaman ini
            if (!allowedRoles.includes(userRole)) {
                alert("Anda tidak memiliki akses ke halaman ini!");
                
                // Arahkan ke dashboard masing-masing yang sesuai
                if (userRole === "admin") window.location.href = "../admin/dashboard.html";
                else if (userRole === "seller") window.location.href = "../seller/dashboard.html";
                else window.location.href = "../customer/account.html";
            }
        } else {
            window.location.href = "../auth/login.html";
        }
    });
}
