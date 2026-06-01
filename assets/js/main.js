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
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      countEl.innerText = totalItems;
    }
  },

  addToCart: (productId) => {
    const products = AlbimoApp.getProducts();
    const cart = AlbimoApp.getCart();
    const product = products.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
      AlbimoApp.showToast("Stok produk habis!", "error");
      return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      if (cartItem.quantity >= product.stock) {
        AlbimoApp.showToast("Tidak bisa melebihi stok yang tersedia!", "error");
        return;
      }
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('albimo_cart', JSON.stringify(cart));
    AlbimoApp.updateCartCount();
    AlbimoApp.showToast(`Berhasil menambah ${product.name} ke keranjang!`);
  },

  removeFromCart: (productId) => {
    let cart = AlbimoApp.getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('albimo_cart', JSON.stringify(cart));
    window.location.reload();
  },

  showToast: (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-sky-600' : 'bg-red-600'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  }
};

// ==========================================
// 3. FUNGSI PROSES CHECKOUT (AMANKAN PATH)
// ==========================================
AlbimoApp.processCheckout = () => {
  const cart = AlbimoApp.getCart();
  let products = AlbimoApp.getProducts();

  if (cart.length === 0) {
    AlbimoApp.showToast("Keranjang Anda kosong, tidak dapat checkout!", "error");
    return;
  }

  let totalHarga = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  for (const cartItem of cart) {
    const originalProd = products.find(p => p.id === cartItem.id);
    if (originalProd && originalProd.stock < cartItem.quantity) {
      AlbimoApp.showToast(`Gagal! Stok ${cartItem.name} tidak mencukupi.`, "error");
      return;
    }
  }

  cart.forEach(cartItem => {
    const productIndex = products.findIndex(p => p.id === cartItem.id);
    if (productIndex !== -1) {
      products[productIndex].stock -= cartItem.quantity;
      if (products[productIndex].stock < 0) products[productIndex].stock = 0;
    }
  });
  localStorage.setItem('albimo_products', JSON.stringify(products));

  const newOrder = {
    orderId: "ALB-" + Math.floor(100000 + Math.random() * 900000), 
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }),
    items: cart,
    total: totalHarga,
    status: "Menunggu Pembayaran"
  };

  const orderHistory = JSON.parse(localStorage.getItem('albimo_order_history')) || [];
  orderHistory.push(newOrder);
  localStorage.setItem('albimo_order_history', JSON.stringify(orderHistory));
  localStorage.setItem('albimo_last_order', JSON.stringify(cart));
  localStorage.setItem('albimo_cart', JSON.stringify([]));

  alert("Pesanan berhasil dibuat! Mengalihkan Anda ke halaman pembayaran...");

  // 🔥 DETEKSI URL GITHUB PAGES AGAR TIDAK EROR POLOS
  const pathName = window.location.pathname;
  const pathSegments = pathName.split('/').filter(segment => segment.length > 0);
  
  let repoName = '';
  if (pathSegments.length > 0 && !pathSegments[0].includes('.html') && pathSegments[0] !== 'admin' && pathSegments[0] !== 'auth') {
    repoName = '/' + pathSegments[0];
  }

  window.location.href = `${window.location.origin}${repoName}/checkout.html`;
};

// ==========================================
// 4. OTOMATISASI HALAMAN TAMPILAN (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  AlbimoApp.updateCartCount();
  
  // A. Render Katalog Produk di index.html atau products.html
  const featuredContainer = document.getElementById('featured-products');
  const catalogContainer = document.getElementById('product-list');
  const targetContainer = featuredContainer || catalogContainer;

  if (targetContainer) {
    targetContainer.innerHTML = ''; 
    const products = AlbimoApp.getProducts();
    
    products.forEach(product => {
      targetContainer.innerHTML += `
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-slate-100 flex flex-col justify-between p-4">
          <div>
            <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg">
            <div class="mt-4">
              <span class="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded">${product.category}</span>
              <h3 class="font-bold text-slate-800 mt-2 text-md line-clamp-2 h-12">${product.name}</h3>
              <p class="text-sky-600 font-bold mt-1">${AlbimoApp.formatRupiah(product.price)}</p>
              <p class="text-xs text-slate-400 mt-1">Stok: ${product.stock} Pcs</p>
            </div>
          </div>
          
          <div class="mt-4 space-y-2">
            <a href="product-detail.html?id=${product.id}" class="block text-center bg-sky-100 text-sky-700 py-2 rounded-lg text-sm font-medium hover:bg-sky-600 hover:text-white transition">
              Lihat Detail Lengkap
            </a>
            <button onclick="AlbimoApp.addToCart(${product.id})" class="w-full text-center bg-sky-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition">
              🛒 + Keranjang
            </button>
          </div>
        </div>
      `;
    });
  }

  // B. Render Daftar Produk di Dalam Keranjang Belanja (cart.html)
  const cartTableContainer = document.getElementById('cart-items-container');
  if (cartTableContainer) {
    const cart = AlbimoApp.getCart();
    const totalPriceEl = document.getElementById('total-price');
    
    if (cart.length === 0) {
      cartTableContainer.innerHTML = `<p class="text-slate-500 text-center py-8">Keranjang belanja Anda masih kosong.</p>`;
      if (totalPriceEl) totalPriceEl.innerText = "Rp 0";
    } else {
      cartTableContainer.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
        cartTableContainer.innerHTML += `
          <div class="flex items-center justify-between border-b py-4">
            <div class="flex items-center space-x-4">
              <img src="${item.img}" class="w-16 h-16 object-cover rounded-lg">
              <div>
                <h4 class="font-bold text-slate-800">${item.name}</h4>
                <p class="text-sm text-sky-600 font-medium">${AlbimoApp.formatRupiah(item.price)} x ${item.quantity}</p>
              </div>
            </div>
            <button onclick="AlbimoApp.removeFromCart(${item.id})" class="text-red-500 text-sm font-medium hover:underline">Hapus</button>
          </div>
        `;
      });
      if (totalPriceEl) totalPriceEl.innerText = AlbimoApp.formatRupiah(total);
    }
  }
});
