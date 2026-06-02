// firebase/cloudinary.js
import { cloudinaryConfig } from "./config.js";

/**
 * Fungsi untuk mengunggah file gambar ke Cloudinary
 * @param {File} fileObject - File gambar dari input type="file"
 * @returns {Promise<string>} - Mengembalikan URL gambar jika sukses
 */
export async function uploadImageToCloudinary(fileObject) {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", fileObject);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cloudinary Response Error:", data);
            throw new Error(data.error?.message || "Gagal upload");
        }

        return data.secure_url;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        alert("Upload gagal: " + error.message);
        throw error;
    }
}
