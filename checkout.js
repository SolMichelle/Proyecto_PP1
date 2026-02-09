(function () {
  const STORAGE_KEY = 'miCarritoV1';
  const LAST_PAID_HASH_KEY = 'miCarritoV1_lastPaidHash';
  let isProcessing = false;
  function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  function simpleHash(str){
    let h=0; for(let i=0;i<str.length;i++){ h = ((h<<5)-h)+str.charCodeAt(i); h |= 0;} return String(h);
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
      if (isProcessing) return;
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const cartSnapshot = getCart();
      if (!cartSnapshot || cartSnapshot.length === 0) {
        const msgEmpty = document.getElementById('checkout-msg');
        msgEmpty.innerHTML = '<div class="alert alert-warning">El carrito está vacío. No hay nada para pagar.</div>';
        return;
      }
      const cartHash = simpleHash(JSON.stringify(cartSnapshot));
      const lastHash = localStorage.getItem(LAST_PAID_HASH_KEY) || sessionStorage.getItem(LAST_PAID_HASH_KEY);
      if (lastHash && lastHash === cartHash) {
        const msgDup = document.getElementById('checkout-msg');
        msgDup.innerHTML = '<div class="alert alert-warning">Este pedido ya fue procesado. Si necesita pagar otro pedido, agregue productos nuevos al carrito.</div>';
        return;
      }
      isProcessing = true;
      const submitBtn = form.querySelector('button[type=submit]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Procesando…'; }
      const msg = document.getElementById('checkout-msg');
      msg.innerHTML = '<div class="alert alert-info">Procesando pago…</div>';
      setTimeout(()=> {
        const payload = {
          'cliente': {
            'nombre': form['nombre'].value,
            'correo': form['correo'].value,
            'direccion': form['direccion'].value,
            'tarjeta': form['tarjeta'].value
          },
          'carrito': cartSnapshot,
          'total': calcTotal(cartSnapshot)
        };
        fetch('http://127.0.0.1:5000/pedidos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)})
          .then(async response => {
            const responseOk = response.ok;
            let data = null;
            try { data = await response.json(); } catch (err) {}
            const serverSaysSuccess = data && (data.status === 'success' || data.success === true);
            if (serverSaysSuccess || (responseOk && !data)) {
              try { localStorage.setItem(LAST_PAID_HASH_KEY, cartHash); } catch(e) { sessionStorage.setItem(LAST_PAID_HASH_KEY, cartHash); }
              localStorage.removeItem(STORAGE_KEY);
              msg.innerHTML = '<div class="alert alert-success">Pago realizado con éxito. Gracias por su compra.</div>';
              try { window.opener?.location && window.opener.location.reload(); } catch(e){}
              setTimeout(()=> window.location.href = 'main.html', 2500);
            } else {
              isProcessing = false;
              if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Pagar ahora'; }
              msg.innerHTML = '<div class="alert alert-danger">Hubo un error procesando el pago. Intente nuevamente.</div>';
            }
          }).catch(err=>{
            isProcessing = false;
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Pagar ahora'; }
            msg.innerHTML = '<div class="alert alert-danger">Error de red. Intente nuevamente.</div>';
          });
      }, 1200);
    });
  });
})();
