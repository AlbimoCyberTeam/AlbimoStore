AlbimoApp.processCheckout = () => {
  const cart = AlbimoApp.getCart();
  let products = AlbimoApp.getProducts();

  if (cart.length === 0) {
    AlbimoApp.showToast("Keranjang Anda kosong, tidak dapat checkout!", "error");
    return;
  }

  // Calculate total price
  let totalHarga = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Validasi tambahan: Pastikan stok barang masih cukup sebelum memotong
  for (const cartItem of cart) {
    const originalProd = products.find(p => p.id === cartItem.id);
    if (originalProd && originalProd.stock < cartItem.quantity) {
      AlbimoApp.showToast(`Gagal! Stok ${cartItem.name} tidak mencukupi.`, "error");
      return;
    }
  }

  // 1. Kurangi stok produk asli
  cart.forEach(cartItem => {
    const productIndex = products.findIndex(p => p.id === cartItem.id);
    if (productIndex !== -1) {
      products[productIndex].stock -= cartItem.quantity;
      if (products[productIndex].stock < 0) products[productIndex].stock = 0;
    }
  });
  localStorage.setItem('albimo_products', JSON.stringify(products));

  // 2. Format struktur objek pesanan baru
  const newOrder = {
    orderId: "ALB-" + Math.floor(100000 + Math.random() * 900000), 
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }),
    items: cart,
    total: totalHarga,
    status: "Menunggu Pembayaran"
  };

  // 3. Masukkan ke dalam database riwayat pesanan global
  const orderHistory = JSON.parse(localStorage.getItem('albimo_order_history')) || [];
  orderHistory.push(newOrder);
  localStorage.setItem('albimo_order_history', JSON.stringify(orderHistory));

  // 4. Simpan salinan data order terakhir untuk keperluan halaman struk ringkasan
  localStorage.setItem('albimo_last_order', JSON.stringify(cart));

  // 5. Kosongkan keranjang belanja
  localStorage.setItem('albimo_cart', JSON.stringify([]));

  alert("Pesanan berhasil dibuat! Mengalihkan Anda ke halaman pembayaran...");

  // 🔥 PERBAIKAN: Deteksi lokasi folder secara otomatis agar navigasi tidak eror
  if (window.location.pathname.includes('/admin/') || window.location.pathname.includes('/auth/')) {
    window.location.href = "../checkout.html"; // Jika user di dalam sub-folder, mundur ke root
  } else {
    window.location.href = "checkout.html"; // Jika user sudah di root folder
  }
};