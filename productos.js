fetch('http://127.0.0.1:5000/products')
    .then(response => response.json())
    .then(data => {
        const productosContainer = document.getElementById('productosContainer');
        productosContainer.innerHTML = ''; 
        
        data.forEach((producto, index) => {
            let imgPath = producto.imagen;
            if (imgPath && !imgPath.startsWith('imagenes/')) {
                imgPath = 'imagenes/' + imgPath;
            }

            const colDiv = document.createElement('div');
            colDiv.className = 'col-6 col-md-3 mb-4';
            colDiv.setAttribute('data-categoria', producto.categoria);
            
            colDiv.innerHTML = `
                <div class="card h-100 text-center">
                    <img src="${imgPath}" class="card-img-top mb-2" alt="${producto.nombre}">
                    <div class="card-body">
                        <h6 class="card-title">${producto.nombre}</h6>
                        <p class="card-text">$${Number(producto.precio).toFixed(2)}</p>
                        <button type="button" 
                                class="btn btn-sm btn-outline-dark btn-add mt-2"
                                data-id="${producto.id_producto}"
                                data-name="${producto.nombre}"
                                data-price="${producto.precio}"
                                data-img="${imgPath}">
                            Agregar
                        </button>
                    </div>
                </div>
            `;
            
            productosContainer.appendChild(colDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar productos:', error);
        const productosContainer = document.getElementById('productosContainer');
        productosContainer.innerHTML = '<div class="col-12"><p class="text-center text-danger">Error al cargar los productos. Por favor, verifique que el servidor esté ejecutándose.</p></div>';
    });

document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const categoria = this.getAttribute('data-categoria');
        
        document.querySelectorAll('#productosContainer [data-categoria]').forEach(card => {
            if (categoria === 'todas' || card.getAttribute('data-categoria') === categoria) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
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
