// assets/js/navbar.js
import { auth, db } from "../../firebase/config.js";
import { onAuthStateChanged } from "https://gstatic.com";
import { doc, getDoc } from "https://gstatic.com";

// Fungsi untuk membuat navbar secara otomatis
export function initNavbar(isSubfolder = false) {
    // Tentukan jalur relatif berdasarkan lokasi file HTML
    const prefix = isSubfolder ? "../" : "./";

    // Buat elemen header baru
    const header = document.createElement("header");
    header.innerHTML = `
        <h1>AlbimoStore-Pro</h1>
        <nav id="dynamicNav">
            <a href="${prefix}index.html">🏠 Beranda</a>
            <a href="${prefix}stores.html">🏬 Daftar Toko</a>
            <span id="authLinks">Memuat menu...</span>
        </nav>
    `;

    // Pasang header di bagian paling atas elemen body
    document.body.insertBefore(header, document.body.firstChild);

    // Deteksi status login pengguna secara real-time
    onAuthStateChanged(auth, async (user) => {
        const authLinks = document.getElementById("authLinks");
        
        if (user) {
            try {
                // Ambil data role pengguna dari Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userRole = userDoc.data().role;

                    // Arahkan menu berdasarkan role masing-masing
                    if (userRole === "admin") {
                        authLinks.innerHTML = `<a href="${prefix}admin/dashboard.html" style="background:#2563eb; color:white;">📊 Panel Admin</a>`;
                    } else if (userRole === "seller") {
                        authLinks.innerHTML = `<a href="${prefix}seller/dashboard.html" style="background:#10b981; color:white;">🏬 Panel Penjual</a>`;
                    } else {
                        authLinks.innerHTML = `
                            <a href="${prefix}customer/cart.html">🛒 Keranjang</a>
                            <a href="${prefix}customer/account.html" style="background:#64748b; color:white;">👤 Akun Saya</a>
                        `;
                    }
                } else {
                    authLinks.innerHTML = `<a href="${prefix}login.html">Login</a>`;
                }
            } catch (error) {
                console.error("Gagal memuat navigasi:", error);
                authLinks.innerHTML = `<a href="${prefix}login.html">Login</a>`;
            }
        } else {
            // Jika pengunjung belum login
            authLinks.innerHTML = `<a href="${prefix}login.html">Login</a>`;
        }
    });
}
