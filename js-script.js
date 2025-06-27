document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el carrusel de Bootstrap (ya está hecho con data-bs-ride="carousel" en el HTML, pero es bueno saber cómo se hace manualmente si fuera necesario)
    // const myCarousel = document.querySelector('#carouselExampleIndicators');
    // const carousel = new bootstrap.Carousel(myCarousel);

    // Funcionalidad básica para el buscador (aún no busca en la página de productos)
    const searchInput = document.querySelector('.input-group input[type="text"]');
    const searchButton = document.querySelector('.input-group button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Buscando: "${searchTerm}" (esta funcionalidad se completará en la página de productos)`);
            // Aquí en un proyecto real, se redirigiría a la página de productos con el término de búsqueda
            // window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Notas:
    // - El carrito y el botón "Ingresar" no tienen funcionalidad JS por ahora, ya que el prompt indica que "aún no funcionan".
    // - La navegación entre páginas se maneja con los atributos `href` de los enlaces HTML.
});