// Email y contraseña válidos predefinidos
const emailValido = "email@ejemplo.com";
const passValida = "P@ssw0rd!";

const errorNombre = document.getElementById("error-email");
const errorPass = document.getElementById("error-pass");
const alertaLogin = document.getElementById("alertaLogin");

document.getElementById('btnLogin').addEventListener('click', function (event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Comprobamos que los campos no estén vacíos
  if(!email || !password){
    if (!email) {
      errorNombre.textContent = "El email es obligatorio."
    }
  
    if (!password) {
      errorPass.textContent = "La contraseña es obligatoria.";
    }
    document.getElementById('login').reset();
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

