// Lógica principal para la barra de búsqueda y el menú de navegación.

document.addEventListener('DOMContentLoaded', () => {
<<<<<<< Updated upstream
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Función para mostrar/ocultar el campo de búsqueda (HU 8)
    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.classList.toggle('d-none');
            // Si el input se muestra, enfocarlo. Si se oculta, limpiar el valor.
            if (!searchInput.classList.contains('d-none')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
            }
        });
    }

    // Función para manejar la búsqueda al presionar ENTER o el botón (HU 8)
    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            // CRÍTICO: Redirigir a la página de productos con el query como parámetro
            window.location.href = `Productos.html?q=${encodeURIComponent(query)}`;
        } else {
            // Si no hay query, simplemente navegar a la página de productos completa.
            window.location.href = 'Productos.html';
        }
    };

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
});
=======
    const searchInput = document.querySelector('.input-group input[type="text"]');
    const searchButton = document.querySelector('.input-group button');
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Buscando: "${searchTerm}" (esta funcionalidad se completará en la página de productos)`); } else {
            alert('Por favor, ingresa un término de búsqueda.');} });
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click(); }});});

const STORAGE_KEY = 'miCarritoV1';
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
