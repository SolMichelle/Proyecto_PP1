const PRODUCT_GROUPS = {
    'Factura': 'facturas',
    'Tortita': 'tortitas',
    'Sanguchito': 'sandwiches',
    'Galleta': 'galletas',
    'Tarta': 'tartas'
};

function parseProductName(nombre) {
    for (const [baseType, category] of Object.entries(PRODUCT_GROUPS)) {
        if (nombre.startsWith(baseType + ':')) {
            const variant = nombre.substring(baseType.length + 1).trim();
            return { baseType, variant, category };
        }
    }
    return { baseType: nombre, variant: null, category: null };
}

function groupProducts(productos) {
    const grouped = {};
    const singles = [];
    
    productos.forEach(producto => {
        const { baseType, variant } = parseProductName(producto.nombre);
        
        if (variant) {
            if (!grouped[baseType]) {
                grouped[baseType] = {
                    baseType,
                    categoria: producto.categoria,
                    variants: []
                };
            }
            grouped[baseType].variants.push({
                id: producto.id_producto,
                name: variant,
                price: producto.precio,
                img: producto.imagen,
                fullName: producto.nombre
            });
        } else {
            singles.push(producto);
        }
    });
    
    return { grouped: Object.values(grouped), singles };
}

function createVariantCard(group) {
    const firstVariant = group.variants[0];
    
    let imgPath = firstVariant.img;
    if (imgPath && !imgPath.startsWith('imagenes/')) {
        imgPath = 'imagenes/' + imgPath;
    }
    
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-3 mb-4';
    colDiv.setAttribute('data-categoria', group.categoria);

    const optionsHTML = group.variants.map(v => 
        `<option value="${v.id}" data-price="${v.price}" data-img="${v.img || ''}">${v.name}</option>`
    ).join('');
    
    colDiv.innerHTML = `
        <div class="card h-100 text-center">
            <img src="${imgPath}" class="card-img-top mb-2" alt="${group.baseType}" data-variant-img>
            <div class="card-body">
                <h6 class="card-title">${group.baseType}s</h6>
                <select class="form-select form-select-sm mb-2" data-variant-selector>
                    ${optionsHTML}
                </select>
                <p class="card-text" data-variant-price>$${Number(firstVariant.price).toFixed(2)}</p>
                <button type="button" 
                        class="btn btn-sm btn-outline-dark btn-add mt-2"
                        data-id="${firstVariant.id}"
                        data-name="${firstVariant.fullName}"
                        data-price="${firstVariant.price}"
                        data-img="${imgPath}"
                        data-has-variants="true">
                    Agregar
                </button>
            </div>
        </div>
    `;
    
    const select = colDiv.querySelector('[data-variant-selector]');
    const img = colDiv.querySelector('[data-variant-img]');
    const priceEl = colDiv.querySelector('[data-variant-price]');
    const addBtn = colDiv.querySelector('.btn-add');
    
    select.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const variantId = this.value;
        const variantPrice = selectedOption.dataset.price;
        const variantImg = selectedOption.dataset.img;
        const variantName = group.baseType + ': ' + selectedOption.text;
        
        let newImgPath = variantImg;
        if (newImgPath && !newImgPath.startsWith('imagenes/')) {
            newImgPath = 'imagenes/' + newImgPath;
        }
        img.src = newImgPath;
        
        priceEl.textContent = `$${Number(variantPrice).toFixed(2)}`;
        
        addBtn.dataset.id = variantId;
        addBtn.dataset.name = variantName;
        addBtn.dataset.price = variantPrice;
        addBtn.dataset.img = newImgPath;
    });
    
    return colDiv;
}

function createSingleCard(producto) {
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
    
    return colDiv;
}

console.log('🔄 Intentando cargar productos desde el servidor...');
fetch('http://127.0.0.1:5000/products')
    .then(response => {
        console.log('📡 Respuesta recibida:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ Productos cargados:', data.length, 'productos');
        
        const productosContainer = document.getElementById('productosContainer');
        productosContainer.innerHTML = ''; 

        const { grouped, singles } = groupProducts(data);
        console.log('📦 Productos agrupados:', grouped.length);
        console.log('📦 Productos individuales:', singles.length);

        grouped.forEach(group => {
            const card = createVariantCard(group);
            productosContainer.appendChild(card);
        });
        
        singles.forEach(producto => {
            const card = createSingleCard(producto);
            productosContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('❌ Error detallado al cargar productos:', error);
        console.error('Tipo de error:', error.name);
        console.error('Mensaje:', error.message);
        
        const productosContainer = document.getElementById('productosContainer');
        let errorMsg = 'Error al cargar los productos. ';
        
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            errorMsg += 'No se puede conectar al servidor. Verifique que:<br>1. El servidor esté corriendo (python app.py)<br>2. MySQL esté activo<br>3. La URL sea correcta: http://127.0.0.1:5000';
        } else {
            errorMsg += 'Detalles: ' + error.message;
        }
        
        productosContainer.innerHTML = `<div class="col-12"><p class="text-center text-danger">${errorMsg}</p></div>`;
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
