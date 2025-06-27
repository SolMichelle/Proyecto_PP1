document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    let captchaValue = '';

    // Función para generar un captcha aleatorio
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) { // Captcha de 6 caracteres
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        captchaValue = result;
        captchaDisplay.textContent = captchaValue;
    }

    // Generar el captcha al cargar la página
    generateCaptcha();

    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Validar el captcha
        if (captchaInput.value.toLowerCase() !== captchaValue.toLowerCase()) {
            alert('El código CAPTCHA es incorrecto. Por favor, inténtalo de nuevo.');
            generateCaptcha(); // Generar un nuevo captcha
            captchaInput.value = ''; // Limpiar el input del captcha
            return; // Detener el envío del formulario
        }

        // Obtener los datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            pedido: document.getElementById('pedido').value,
            fechaPedido: document.getElementById('fechaPedido').value
        };

        // Simular el envío del formulario (aquí iría la lógica real para enviar a un servidor)
        console.log('Datos del formulario enviados:', formData);
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.');

        // Limpiar el formulario
        contactForm.reset();
        generateCaptcha(); // Generar un nuevo captcha después del envío

        // NOTA IMPORTANTE sobre el envío de emails y WhatsApp:
        // Para que el formulario envíe emails directamente a la panadería o notificaciones a WhatsApp,
        // necesitarían un **backend (servidor)**. JavaScript del lado del cliente (lo que estamos usando aquí)
        // no puede enviar correos electrónicos directamente por razones de seguridad.

        // Opciones para el envío real (requieren conocimiento de backend):
        // 1. Usar un servicio de backend (como Node.js con Express, Python con Flask/Django, PHP, etc.)
        //    que reciba los datos del formulario y use librerías para enviar emails (ej. Nodemailer para Node.js)
        //    o integrar con APIs de WhatsApp Business.
        // 2. Usar servicios de formularios de terceros como Formspree, Netlify Forms, o Google Forms.
        //    Estos servicios te dan una URL a la que puedes enviar los datos de tu formulario HTML
        //    y ellos se encargan de reenviar el email. Para WhatsApp, es más complejo y generalmente
        //    requiere la API de WhatsApp Business.

        // Por ahora, el `alert` simula que el mensaje fue "enviado".
    });
});