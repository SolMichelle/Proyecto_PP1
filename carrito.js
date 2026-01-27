(function () {
  const STORAGE_KEY = 'miCarritoV1';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateBadge();
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) existing.qty = Number(existing.qty || 0) + Number(item.qty || 1);
    else cart.push(Object.assign({ qty: Number(item.qty || 1) }, item));
    saveCart(cart);
  }

  function removeFromCart(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    updateBadge();
    renderCart();
  }

  function getTotal(cart) {
    return cart.reduce((s, i) => s + (Number(i.price) * (Number(i.qty) || 1)), 0);
  }

  function formatMoney(n){
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
  }

  function updateBadge() {
    const count = getCart().reduce((s,i)=> s + (Number(i.qty)||0), 0);
    const el = document.getElementById('cart-count');
    if (!el) return;
    if (count > 0) {
      el.textContent = count;
      el.classList.remove('d-none');
    } else {
      el.textContent = '';
      el.classList.add('d-none');
    }
  }

  function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;
    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = '<p>El carrito está vacío.</p>';
      totalEl.textContent = formatMoney(0);
      return;
    }
    container.innerHTML = cart.map(item => `
      <div class="d-flex align-items-center mb-2" data-id="${item.id}">
        <img src="${item.img||''}" alt="" style="width:60px;height:60px;object-fit:cover;margin-right:12px;border-radius:6px;">
        <div class="flex-grow-1">
          <div><strong>${item.name}</strong></div>
          <div>${formatMoney(Number(item.price))} x <span class="fw-bold">${item.qty}</span></div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger btn-remove">Eliminar</button>
        </div>
      </div>
    `).join('');
    totalEl.textContent = formatMoney(getTotal(cart));
    container.querySelectorAll('.btn-remove').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const id = e.target.closest('[data-id]').getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.btn-add');
    if (!btn) return;
    e.preventDefault();
    const item = buildItemFromButton(btn);
    addToCart(item);
    btn.classList.add('btn-success');
    setTimeout(()=> btn.classList.remove('btn-success'), 500);
  });

  function buildItemFromButton(btn){
    const id = btn.dataset.id || ('item-' + Date.now());
    const name = btn.dataset.name || (btn.closest('.card')?.querySelector('.card-title')?.textContent.trim() || 'Producto');
    let price = 0;
    if (btn.dataset.price) {
      const raw = String(btn.dataset.price);
      const cleaned = raw.replace(/[^0-9.,-]/g, '').replace(/\.(?=\d{3})/g, '');
      price = parseFloat(cleaned.replace(',', '.')) || 0;
    }
    if (!price) price = extractPriceFromCard(btn);
    const img = btn.dataset.img || (btn.closest('.card')?.querySelector('.card-img-top')?.getAttribute('src') || '');
    const qty = Number(btn.dataset.qty) || 1;
    return { id, name, price, img, qty };
  }

  function extractPriceFromCard(btn){
    const card = btn.closest('.card');
    if (!card) return 0;
    const p = card.querySelector('.card-text');
    if (!p) return 0;
    const txt = p.textContent || '';
    const cleaned = txt.replace(/[^0-9.,-]/g, '').replace(/\.(?=\d{3})/g, '').replace(',', '.');
    const val = parseFloat(cleaned);
    return Number.isFinite(val) ? val : 0;
  }
  window.addEventListener('storage', function(e){
    if (e.key === STORAGE_KEY) {
      updateBadge();
      renderCart();
    }
  });
  document.addEventListener('DOMContentLoaded', function(){
    updateBadge();
    renderCart();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) cartModal.addEventListener('shown.bs.modal', renderCart);

    const checkout = document.getElementById('checkout-btn');
    if (checkout) checkout.addEventListener('click', function(){
      window.location.href = 'pago.html';
    });
    window.miCarrito = { clear: clearCart, get: getCart };
  });

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.textContent = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        countEl.classList.toggle('d-none', cart.length === 0);
    }
  }
})();
