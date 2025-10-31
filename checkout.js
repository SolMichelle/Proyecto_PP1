(function () {
  const STORAGE_KEY = 'miCarritoV1';
  function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  function formatMoney(n){
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
  }
  function calcTotal(cart){
    return cart.reduce((s,i)=> s + (Number(i.price) * (Number(i.qty)||1)), 0);
  }
  function renderCart(){
    const container = document.getElementById('checkout-cart');
    const totalEl = document.getElementById('checkout-total');
    const cart = getCart();
    if (!container || !totalEl) return;
    if (cart.length === 0) {
      container.innerHTML = '<p>El carrito está vacío.</p>';
      totalEl.textContent = formatMoney(0);
      return;
    }
    container.innerHTML = cart.map(i=>`
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <div><strong>${i.name}</strong></div>
          <small class="text-muted">${i.qty} x ${formatMoney(i.price)}</small>
        </div>
        <div>${formatMoney(Number(i.price)*(Number(i.qty)||1))}</div>
      </div>
    `).join('');
    totalEl.textContent = formatMoney(calcTotal(cart));
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderCart();
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const msg = document.getElementById('checkout-msg');
      msg.innerHTML = '<div class="alert alert-info">Procesando pago…</div>';
      setTimeout(()=> {
        localStorage.removeItem(STORAGE_KEY);
        msg.innerHTML = '<div class="alert alert-success">Pago realizado con éxito. Gracias por su compra.</div>';
        try { window.opener?.location && window.opener.location.reload(); } catch(e){}
        fetch('http://127.0.0.1:5000/pedidos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          'cliente': {
            'nombre': form['nombre'].value,
            'correo': form['correo'].value,
            'direccion': form['direccion'].value,
            'tarjeta': form['tarjeta'].value
          },
          'carrito': getCart(),
          'total': calcTotal(getCart())
        })}).then(response => response.json()).then(data => {
          if (data.status === 'success') {
            setTimeout(()=> window.location.href = 'main.html', 2500);
          }
        });
      }, 1200);
    });
  });
})();

