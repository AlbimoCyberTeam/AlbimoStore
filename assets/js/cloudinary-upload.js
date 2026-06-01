const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/diutiwqz1/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "BlackDragonSkull";

export async function uploadImage(file) {
  if (!file) throw new Error("File gambar belum dipilih");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Upload Cloudinary gagal");
  }

  if (!data.secure_url) {
    throw new Error("URL gambar tidak diterima dari Cloudinary");
  }

  return data.secure_url;
}
