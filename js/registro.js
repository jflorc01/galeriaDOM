document.getElementById('btnRegistrar').addEventListener('click', async function(event) {
    event.preventDefault();

    const API_URL = "http://localhost:3000/usuarios"; // Ajusta la URL si es necesario

    // Definimos las constantes y los patrones
    const nombre = document.getElementById('nombre').value.trim();
    const apellido1 = document.getElementById('apellido1').value.trim();
    const apellido2 = document.getElementById('apellido2').value.trim();
    const patronNomApe = /^[a-zA-Z0-9_]{3,20}$/;

    const email = document.getElementById('email').value.trim();
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();
    const patronPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

    const privacidad = document.getElementById('terms-and-conditions').checked;

    let esValido = true;

    // Validamos el nombre
    if (!patronNomApe.test(nombre)) {
        esValido = false;
        document.getElementById('error-nombre').textContent = "Nombre inválido. (Solo letras, números y guiones bajos).";
    } else {
        document.getElementById('error-nombre').textContent = "";
    }

    // Validamos el primer apellido
    if (!patronNomApe.test(apellido1)) {
        esValido = false;
        document.getElementById('error-apellido1').textContent = "Apellido inválido. (Solo letras, números y guiones bajos).";
    } else {
        document.getElementById('error-apellido1').textContent = "";
    }

    // Validamos el correo electrónico
    if (!patronEmail.test(email)) {
        esValido = false;
        document.getElementById('error-email').textContent = "Correo electrónico inválido. (Ejemplo: hola@ejemplo.com).";
    } else {
        document.getElementById('error-email').textContent = "";
    }

    // Validamos la contraseña
    if (!patronPass.test(password)) {
        esValido = false;
        document.getElementById('error-password').textContent = "Contraseña inválida. (Mínimo 8 caracteres, 1 minúscula, 1 mayúscula, número y símbolo).";
    } else {
        document.getElementById('error-password').textContent = "";
    }

    // Confirmación de contraseña
    if (password !== password2) {
        esValido = false;
        document.getElementById('error-confirm').textContent = "Las contraseñas no coinciden";
    } else {
        document.getElementById('error-confirm').textContent = "";
    }

    // Comprobamos que se marque el checkbox
    if (!privacidad) {
        esValido = false;
        document.getElementById('error-privacidad').textContent = "Debe aceptar la política de privacidad.";
    } else {
        document.getElementById('error-privacidad').textContent = "";
    }

    // Si todo es válido, intentamos registrar el usuario
    if (esValido) {
        try {
            // Comprobamos si el email ya está registrado
            let respuesta = await fetch(API_URL);
            let usuarios = await respuesta.json();
            let existe = usuarios.some(user => user.user === email.split('@')[0]);

            if (existe) {
                document.getElementById('error-email').textContent = "Este email ya está registrado.";
                return;
            }

            // Creamos el objeto usuario
            let nuevoUsuario = {
                user: email.split('@')[0],
                pass: password,
                rol: "user",
                favoritos: []
            };

            // Enviar el usuario a la base de datos
            let respuestaRegistro = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario)
            });

            if (respuestaRegistro.ok) {
                alert("Se ha registrado correctamente");
                document.getElementById('registro').reset();
            } else {
                throw new Error("Error en el registro.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Ocurrió un error al registrar el usuario.");
        }
    }
});
