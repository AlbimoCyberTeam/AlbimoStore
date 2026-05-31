const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/albimostore/image/upload";

const CLOUDINARY_UPLOAD_PRESET = "BlackDragonSkull";

export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload gagal");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}
