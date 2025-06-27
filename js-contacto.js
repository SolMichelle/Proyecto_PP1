document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    let captchaValue = '';

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


    generateCaptcha();

   
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // Validar el captcha
        if (captchaInput.value.toLowerCase() !== captchaValue.toLowerCase()) {
            alert('El código CAPTCHA es incorrecto. Por favor, inténtalo de nuevo.');
            generateCaptcha(); 
            captchaInput.value = ''; 
            return; 
        }

        
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            pedido: document.getElementById('pedido').value,
            fechaPedido: document.getElementById('fechaPedido').value
        };

        
        console.log('Datos del formulario enviados:', formData);
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.');

        
        contactForm.reset();
        generateCaptcha(); 
    });
});
