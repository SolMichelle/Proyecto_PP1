// CONTACTOS.JS: Maneja la simulación de envío del formulario (HU 11)
/**
 * Muestra u oculta el formulario de contacto.*/

function toggleFormulario() {
    const form = document.getElementById('formulario-contacto');
    if (form) {
        // propiedad display
        const isVisible = form.style.display === 'block' || window.getComputedStyle(form).display !== 'none';
        form.style.display = isVisible ? 'none' : 'block';
    }
}
window.toggleFormulario = toggleFormulario; // Exportar globalmente

/**
 * CRÍTICO: Simula el envío exitoso del formulario.
 * Esta función evita el envío real y muestra un mensaje de éxito.
 * @param {Event} event 
 */

window.handleContactFormSubmit = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const form = document.getElementById('contactForm');
    
    // Validar con Bootstrap
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const nombre = form.nombre.value;
    const submitButton = form.querySelector('button[type="submit"]');
    const msgContainer = document.getElementById('checkout-msg') || form.nextElementSibling;

    // 1. Deshabilitar botón y mostrar 'Enviando...'
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    msgContainer.innerHTML = '<div class="alert alert-info mt-4">Procesando mensaje ficticio...</div>';

    // 2. Retraso para simular el tiempo de respuesta
    setTimeout(() => {
        
        // Crear el mensaje de éxito
        msgContainer.innerHTML = `
            <div class="alert alert-success mt-4" role="alert">
                ¡Gracias, <strong>${nombre}</strong>! Tu mensaje ha sido recibido de forma ficticia. Te contactaremos pronto.
            </div>`;

        // Limpiar formulario y quitar la clase de validación
        form.reset();
        form.classList.remove('was-validated');
        
        // Restaurar botón
        submitButton.textContent = 'Enviar Mensaje Ficticio';
        submitButton.disabled = false;

        // Ocultar el mensaje después de 8 segundos
        setTimeout(() => {
            msgContainer.innerHTML = '';
        }, 8000);

<<<<<<< Updated upstream
    }, 3000);
};
=======
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
>>>>>>> Stashed changes
