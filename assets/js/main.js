// ==========================================
// 1. INISIALISASI DATA AWAL (LOCAL STORAGE)
// ==========================================
const defaultProducts = [
  { 
    id: 1, 
    name: "Albimo Headphone Pro X", 
    price: 1250000, 
    category: "Elektronik", 
    stock: 10, 
    img: "https://picsum.photos" 
  },
  { 
    id: 2, 
    name: "Albimo Mechanical Keyboard", 
    price: 850000, 
    category: "Aksesoris", 
    stock: 15, 
    img: "https://picsum.photos" 
  },
  { 
    id: 3, 
    name: "Albimo Ergonomic Mouse", 
    price: 450000, 
    category: "Aksesoris", 
    stock: 8, 
    img: "https://picsum.photos" 
  }
];

if (!localStorage.getItem('albimo_products')) {
  localStorage.setItem('albimo_products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('albimo_cart')) {
  localStorage.setItem('albimo_cart', JSON.stringify([]));
}

// ==========================================
// 2. OBJEK UTAMA APLIKASI (ALBIMO APP)
// ==========================================
const AlbimoApp = {
  getProducts: () => JSON.parse(localStorage.getItem('albimo_products')) || [],
  getCart: () => JSON.parse(localStorage.getItem('albimo_cart')) || [],
  
  formatRupiah: (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(angka);
  },

  updateCartCount: () => {
    const cart = AlbimoApp.getCart();
    const countEl = 
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3000);
  }
};

document.addEventListener('DOMContentLoaded',()=>{
  AlbimoApp.updateCartCount();
});
