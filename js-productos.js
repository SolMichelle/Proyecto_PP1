document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const categoria = this.getAttribute('data-categoria');
        document.querySelectorAll('.row [data-categoria]').forEach(card => {
            if (card.classList.contains('col-6') || card.classList.contains('col-md-3')) {
                if (categoria === 'todas' || card.getAttribute('data-categoria') === categoria) {
                    card.style.display = '';
                } else {card.style.display = 'none'; }}});});});
              function cambiarSaborGalleta(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;}
function cambiarSaborFactura(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;}
function cambiarSaborTarta(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;}
function cambiarSaborTortita(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;}
function cambiarSaborSanguchito(select) {
    const img = select.closest('.card').querySelector('img');
    img.src = 'imagenes/' + select.value;}
