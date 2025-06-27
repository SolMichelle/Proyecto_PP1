document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.list-group-item a');
    const productItems = document.querySelectorAll('.product-item');
    const searchInput = document.querySelector('header .input-group input[type="text"]');
    const searchButton = document.querySelector('header .input-group button');

    // Función para filtrar productos por categoría
    function filterProducts(category) {
        productItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block'; // Muestra el producto
            } else {
                item.style.display = 'none'; // Oculta el producto
            }
        });
    }

    // Event listener para los enlaces de categoría
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página
            const category = event.target.dataset.category;
            filterProducts(category);
        });
    });

    // Función para buscar productos
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        productItems.forEach(item => {
            const productName = item.querySelector('.card-title').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Event listener para el botón de búsqueda
    searchButton.addEventListener('click', searchProducts);

    // Event listener para la tecla "Enter" en el input de búsqueda
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });

    // Cargar todos los productos al inicio
    filterProducts('all');
});