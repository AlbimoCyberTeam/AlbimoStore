// firebase/cloudinary.js
import { cloudinaryConfig } from "./config.js";

/**
 * Fungsi untuk mengunggah file gambar ke Cloudinary
 * @param {File} fileObject - File gambar dari input type="file"
 * @returns {Promise<string>} - Mengembalikan URL gambar jika sukses
 */
export async function uploadImageToCloudinary(fileObject) {
    const url = `https://cloudinary.com{cloudinaryConfig.cloudName}/image/upload`;
    
    const formData = new FormData();
    formData.append("file", fileObject);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Gagal mengunggah gambar ke Cloudinary");
        }

        const data = await response.json();
        return data.secure_url; // Mengembalikan URL gambar HTTPS yang aman
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
}
