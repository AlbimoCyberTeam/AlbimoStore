const CLOUD_NAME = "diutiwqz1";
const UPLOAD_PRESET = "AlbimoStore.com";

function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  return fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => data.secure_url);
}
