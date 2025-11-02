function toggleFormulario() {
    const form = document.getElementById('formulario-contacto');
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

function mostrarMensajeExito() {

    let mensajeContainer = document.getElementById('mensaje-exito');
    
    if (!mensajeContainer) {
        mensajeContainer = document.createElement('div');
        mensajeContainer.id = 'mensaje-exito';
        mensajeContainer.className = 'alert alert-success alert-dismissible fade show mt-3';
        mensajeContainer.setAttribute('role', 'alert');

        const formContainer = document.getElementById('formulario-contacto');
        formContainer.parentNode.insertBefore(mensajeContainer, formContainer.nextSibling);
    }

    mensajeContainer.innerHTML = `
        <strong>¡Mensaje enviado con éxito! </strong>
        <p class="mb-0">Gracias por contactarnos. Responderemos a la brevedad.</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    mensajeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
        if (mensajeContainer && mensajeContainer.classList.contains('show')) {
            const bsAlert = new bootstrap.Alert(mensajeContainer);
            bsAlert.close();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            const formData = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            console.log('📧 Datos del formulario:', formData);
            
            mostrarMensajeExito();
            
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
        });
    }
});
