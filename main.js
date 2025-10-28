document.addEventListener('DOMContentLoaded', () => {
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
