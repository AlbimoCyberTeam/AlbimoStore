import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../../firebase/config.js";

// Update badge angka belanjaan
export function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = cart.length;
}

// Logika dinamis tombol navbar Login / Logout
export function initAuthNavbar() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authLink.innerText = "Keluar (Logout)";
      authLink.href = "#";
      authLink.onclick = async (e) => {
        e.preventDefault();
        await signOut(auth);
        alert('Berhasil Keluar.');
        window.location.reload();
      };
    } else {
      authLink.innerText = "Login";
      authLink.href = "auth/login.html";
      authLink.onclick = null;
    }
  });
}
