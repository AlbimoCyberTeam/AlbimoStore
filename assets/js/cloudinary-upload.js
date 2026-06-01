// Konfigurasi Upload Gambar untuk Produk
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diutiwqz1/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'albimostore';

async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload gagal:', error);
    return null;
  }
}
