
// Albimo Store - Fixed Version
const AlbimoApp = {
  getProducts(){
    return JSON.parse(localStorage.getItem('albimo_products') || '[]');
  },
  getCart(){
    return JSON.parse(localStorage.getItem('albimo_cart') || '[]');
  },
  formatRupiah(n){
    return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0}).format(n);
  },
  updateCartCount(){
    const el=document.getElementById('cart-count');
    if(el){ el.textContent=this.getCart().length; }
  },
  showToast(msg){
    const toast=document.createElement('div');
    toast.textContent=msg;
    toast.style.cssText='position:fixed;bottom:20px;right:20px;background:#2563eb;color:white;padding:12px 18px;border-radius:8px;z-index:9999';
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3000);
  }
};
document.addEventListener('DOMContentLoaded',()=>AlbimoApp.updateCartCount());
