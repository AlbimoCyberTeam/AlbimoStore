// firebase/firestore.js
import { db } from "./config.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where 
} from "https://gstatic.com";

// 1. Tambah Produk Baru (Untuk Seller)
export async function addProduct(sellerId, productData) {
    try {
        const docRef = await addDoc(collection(db, "products"), {
            sellerId: sellerId,
            name: productData.name,
            price: Number(productData.price),
            description: productData.description,
            imageUrl: productData.imageUrl, // URL hasil upload Cloudinary
            stock: Number(productData.stock),
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// 2. Ambil Semua Produk (Untuk Halaman Utama / index.html)
export async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error("Gagal mengambil produk:", error);
        return [];
    }
}