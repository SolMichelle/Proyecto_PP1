fetch('http://127.0.0.1:5000/products').then(response => response.json()).then(data => {
    const productosContainer = document.getElementById('productosContainer');
    data.forEach(producto => {
        const card = new DOMParser().parseFromString(`<div class="col-6 col-md-3 mb-4" data-categoria="${producto.categoria}">
                <div class="card h-100 text-center">
                    <img id="img-factura" src="${producto.imagen}" class="card-img-top mb-2" alt="Facturas">
                    <div class="card-body">
                        <h6 class="card-title">${producto.nombre}</h6>
                        <p class="card-text">$ ${producto.precio}</p>
                    </div>
                </div>
            </div>`, 'text/html').body.firstChild;
        productosContainer.appendChild(card);
    }
    );
});
document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const categoria = this.getAttribute('data-categoria');
        document.querySelectorAll('.row [data-categoria]').forEach(card => {
            if (card.classList.contains('col-6') || card.classList.contains('col-md-3')) {
                if (categoria === 'todas' || card.getAttribute('data-categoria') === categoria) {
                    card.style.display = '';
                } else { card.style.display = 'none'; }
            }
        });
    });
});
function cambiarSaborGalleta(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;
}
function cambiarSaborFactura(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;
}
function cambiarSaborTarta(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;
}
function cambiarSaborTortita(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;
}
function cambiarSaborSanguchito(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;
}
