// Email y contraseña válidos predefinidos
const emailValido = "email@ejemplo.com";
const passValida = "P@ssw0rd!";

document.getElementById('btnLogin').addEventListener('click', function (event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Comprobamos que los campos no estén vacíos
  if (!email) {
    alert("El email es obligatorio.");
    return;
  }

  if (!password) {
    alert("La contraseña es obligatoria.");
    return;
  }

  // Validamos los datos de inicio de sesión
  if (email === emailValido && password === passValida) {
    alert("Inicio de sesión exitoso. ¡Bienvenido!");
    document.getElementById('login').reset();
  } else {
    alert("Email o contraseña incorrectos. Inténtalo de nuevo.");
  }
});

