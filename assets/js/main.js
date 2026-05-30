import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../../firebase/config.js";

export function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cart-count');

  if (badge) {
    badge.innerText = cart.length;
  }
}

export function initAuthNavbar() {
  const authLink = document.getElementById('auth-link');

  if (!authLink) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authLink.innerText = "Logout";
      authLink.href = "#";

      authLink.onclick = async (e) => {
        e.preventDefault();

        try {
          await signOut(auth);
          alert("Berhasil logout");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };
    } else {
      authLink.innerText = "Login";
      authLink.href = "/auth/login.html";
    }
  });
}
