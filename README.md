# AlbimoStore-Pro 🛒
AlbimoStore-Pro adalah platform *multi-vendor e-commerce* berbasis arsitektur *Jamstack* (HTML, CSS, JavaScript murni) yang terintegrasi penuh dengan **Firebase v10** (Autentikasi & Firestore) sebagai backend dan **Cloudinary** sebagai media penyimpanan gambar produk.


## 📁 Struktur Proyek
Sistem ini menggunakan pembagian akses berbasis peran (*Role-Based Access Control*) yang diproteksi menggunakan script pengaman rute (`auth-guard.js`):
- **Root**: Halaman publik untuk katalog utama, detail produk, pendaftaran, dan login.
- **Admin/**: Panel pusat untuk mengawasi user, memverifikasi seller, memoderasi produk, dan laporan transaksi platform.
- **Seller/**: Panel khusus vendor untuk mengelola profil toko, mengunggah produk, dan memproses pesanan masuk.
- **Customer/**: Panel khusus pembeli untuk mengelola profil, melihat keranjang belanja, wishlist, dan riwayat pesanan.
- **Firebase/**: Modul modular koneksi SDK Firebase dan API Cloudinary.

---

## 🛠️ Persiapan & Instalasi

### 1. Konfigurasi Firebase
1. Buka [Firebase Console](https://google.com).
2. Buat proyek baru dengan nama **AlbimoStore-Pro**.
3. Aktifkan layanan berikut:
   - **Authentication**: Aktifkan metode masuk menggunakan *Email/Password*.
   - **Cloud Firestore**: Buat database baru dalam *Production Mode* atau *Test Mode*.
4. Ambil kredensial web app Anda dan salin ke file `firebase/config.js`.

### 2. Konfigurasi Cloudinary (Penyimpanan Gambar)
1. Buat akun di [Cloudinary](https://cloudinary.com).
2. Masuk ke dashboard dan dapatkan **Cloud Name** Anda.
3. Buka menu **Settings > Upload** dan tambahkan **Upload Preset** baru:
   - Atur mode menjadi **Unsigned** (Penting agar upload langsung dari JavaScript murni berjalan tanpa backend server).
4. Salin Cloud Name dan Upload Preset Anda ke file `firebase/config.js`.

---

## 🗄️ Skema Basis Data (Firestore)

Platform ini mengandalkan dua koleksi (*collections*) utama di Cloud Firestore:

### 1. Koleksi `users`
Menyimpan data identitas semua akun dan profil toko jika pengguna tersebut adalah seorang Seller.
```json
{
  "uid": "STRING_USER_ID",
  "fullName": "Nama Lengkap Pengguna",
  "email": "user@example.com",
  "role": "customer | seller | admin",
  "createdAt": "ISO_TIMESTAMP",
  "storeDetails": {
    "name": "Nama Toko Seller",
    "slogan": "Slogan Toko",
    "description": "Deskripsi Lengkap Toko",
    "updatedAt": "ISO_TIMESTAMP"
  }
}
```

### 2. Koleksi `products`
Menyimpan semua data barang dagangan yang diunggah oleh para penjual.
```json
{
  "sellerId": "UID_SELLER_PEMILIK",
  "name": "Nama Barang",
  "price": 150000,
  "stock": 50,
  "description": "Deskripsi detail mengenai spesifikasi produk",
  "imageUrl": "https://cloudinary.com...",
  "createdAt": "ISO_TIMESTAMP"
}
```

### 3. Koleksi `orders`
Menyimpan semua data riwayat transaksi pembelian global.
```json
{
  "customerId": "UID_CUSTOMER_PEMBELI",
  "customerEmail": "pembeli@example.com",
  "shippingDetails": {
    "phone": "08123456789",
    "address": "Alamat Lengkap Pengiriman"
  },
  "items": [
    {
      "id": "ID_PRODUK",
      "name": "Nama Barang",
      "price": 150000,
      "quantity": 2,
      "sellerId": "UID_SELLER_PEMILIK",
      "imageUrl": "https://cloudinary.com..."
    }
  ],
  "paymentMethod": "Transfer Bank | E-Wallet",
  "totalPayment": 300000,
  "status": "Pending | Diproses | Dikirim | Dibatalkan",
  "createdAt": "ISO_TIMESTAMP"
}
```

---

## 🚀 Cara Menjalankan Aplikasi
Karena proyek ini menggunakan modul JavaScript ES6 asli (`type="module"`), browser membutuhkan lingkungan server lokal untuk menjalankannya demi mematuhi aturan keamanan CORS.

1. Gunakan ekstensi **Live Server** di VS Code atau jalankan perintah lokal via terminal:
   ```bash
   # Jika menggunakan NodeJS / NPM
   npx serve .
   ```
2. Buka peramban di alamat `http://localhost:3000` atau port yang disediakan oleh Live Server Anda.

---

## 🔒 Catatan Keamanan Penting (Aturan Firestore)
Pastikan Anda memasang aturan keamanan (*Security Rules*) di Firebase Console Anda seperti berikut untuk mencegah pembobolan database dari luar aplikasi:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Aturan untuk Koleksi Pengguna
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    // Aturan untuk Koleksi Produk
    match /products/{productId} {
      allow read: if true; // Publik bisa melihat
      allow write: if request.auth != null; // Harus login untuk menambah/mengubah
    }
    // Aturan untuk Koleksi Pesanan
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}