const CLOUDINARY_URL = "https://cloudinary.com";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UNSIGNED_PRESET_NAME";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // Mengembalikan URL gambar siap simpan di Firebase
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}
