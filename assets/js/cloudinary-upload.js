const CLOUDINARY_CLOUD_NAME = "diutiwqz1";
const CLOUDINARY_UPLOAD_PRESET = "AlbimoStore.com";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload gambar gagal");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    alert("Gagal upload gambar ke Cloudinary");
    throw error;
  }
}
