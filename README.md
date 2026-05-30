# AlbimoStore
# Albimo Store Marketplace

Aplikasi e-commerce berbasis client-side murni yang cepat, ringan, dan berjalan tanpa server backend.

## Tech Stack
- **Frontend Hosting:** GitHub Pages (Static Hosting)
- **Database Realtime:** Firebase Realtime Database
- **Autentikasi Pengguna:** Firebase Auth
- **Penyimpanan Media Gambar:** Cloudinary API Engine

## Cara Menyiapkan Akun Admin Pertama Kali
1. Lakukan pendaftaran akun seperti biasa melalui halaman `auth/register.html`.
2. Masuk ke Firebase Console Anda -> **Realtime Database**.
3. Temukan ID pengguna (`uid`) Anda di dalam objek json node `users`.
4. Ubah nilai properti `"role": "customer"` menjadi `"role": "admin"`.
5. Sekarang akun tersebut memiliki akses penuh ke folder `/admin/*`.


Untuk Albimo Store, paling ideal:
👉 Firebase Realtime Database (data) 👉 Cloudinary (gambar) 👉 GitHub Pages (hosting)


albimo-store/
│
├── index.html
├── products.html
├── product-detail.html
├── cart.html
├── checkout.html
│
├── auth/
│ ├── login.html
│ ├── register.html
│ └── forgot-password.html
│
├── admin/
│ ├── login.html
│ ├── dashboard.html
│ ├── products.html
│ ├── add-product.html
│ ├── edit-product.html
│ ├── orders.html
│ └── users.html
│
├── assets/
│ ├── css/style.css
│ ├── js/main.js
│ ├── js/cloudinary-upload.js
│ └── images/ (opsional dummy images)
│
├── firebase/
│ └── config.js
└── README.md
