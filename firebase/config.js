const firebaseConfig = {
  apiKey: "AIzaSyC_mlSh_6OoqgydUbfhFPpXEBAQjcBNNiM",
  authDomain: "albimostore.firebaseapp.com",
  databaseURL: "https://albimostore-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "albimostore",
  appId: "1:609426144482:web:fa6c9107832ea6ff4d72bb"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
