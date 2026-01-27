// Maneja la lógica de la página de pago y el envío seguro al servidor

<<<<<<< Updated upstream
(function () {
	const STORAGE_KEY = 'miCarritoV1';
    
	function getCart() {
	    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
	    catch { return []; }
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
	      container.innerHTML = '<p>El carrito está vacío. Por favor, <a href="Productos.html">vuelve a la tienda</a>.</p>';
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
	    totalEl.dataset.total = calcTotal(cart); 
	}

	document.addEventListener('DOMContentLoaded', function(){
	    renderCart();
	    const form = document.getElementById('checkout-form');
	    
	    if (!form) return; 

	    form.addEventListener('submit', function(e){
	      e.preventDefault();
	      e.stopPropagation();
	      
	      // 1. Validación
	      if (!form.checkValidity()) {
	        form.classList.add('was-validated');
	        return;
	      }
	      
	      const msg = document.getElementById('checkout-msg');
	      const cartSnapshot = getCart(); 
	      const total = calcTotal(cartSnapshot);

	      if (cartSnapshot.length === 0) {
	          msg.innerHTML = '<div class="alert alert-danger">El carrito está vacío. No se puede procesar el pedido.</div>';
	          return;
	      }

	      // 2. Indicador de proceso
	      msg.innerHTML = '<div class="alert alert-info">Procesando pago ficticio y registrando pedido...</div>';
	      
	      // 3. Simulación de pago con retraso falso
	      setTimeout(()=> {
	        
	        // 4. CRÍTICO: Usar el endpoint correcto /checkout y añadir manejo de errores.
	        fetch('http://127.0.0.1:5000/checkout', {
	            method: 'POST', 
	            headers: { 'Content-Type': 'application/json' }, 
	            body: JSON.stringify({
	                'cliente': {
	                    'nombre': form['nombre'].value,
	                    'correo': form['correo'].value,
	                    'direccion': form['direccion'].value,
	                    'tarjeta': form['tarjeta'].value
	                },
	                'carrito': cartSnapshot,
	                'total': total
	            })
	        })
	        .then(response => {
	             if (!response.ok) {
	                 throw new Error('Error en el servidor: ' + response.status);
	             }
	             return response.json();
	        })
	        .then(data => {
	            // 5. CRÍTICO: SOLO vaciamos el carrito si el backend confirma el éxito.
	            if (data.status === 'success') {
	                localStorage.removeItem(STORAGE_KEY);
	                
	                // Intentar limpiar el contador del carrito en otras pestañas
	                if (window.miCarrito && window.miCarrito.clear) {
	                     window.miCarrito.clear(); 
	                }

	                msg.innerHTML = '<div class="alert alert-success">Pago realizado con éxito. Gracias por su compra.</div>';
	                setTimeout(()=> window.location.href = 'main.html', 2500);
	            } else {
	                msg.innerHTML = `<div class="alert alert-warning">Error al registrar el pedido: ${data.message || 'Error desconocido.'}</div>`;
	            }
	        })
	        .catch(error => {
	            // 6. Manejo de errores de red o del servidor
	            console.error('Error durante el envío del pedido:', error);
	            msg.innerHTML = '<div class="alert alert-danger">Error de conexión con el servidor. Por favor, asegúrate de que Flask esté activo e inténtalo de nuevo.</div>';
	        });
	      }, 1200);
	    });
	});
=======
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
  
>>>>>>> Stashed changes
})();

