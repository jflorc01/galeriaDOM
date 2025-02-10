document.getElementById('btnLogin').addEventListener('click', async function (event) {
  event.preventDefault();

  const API_URL = "http://localhost:3000/usuarios";
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const errorNombre = document.getElementById("error-email");
  const errorPass = document.getElementById("error-pass");

  errorNombre.textContent = "";
  errorPass.textContent = "";

  if (!email || !password) {
      if (!email) {
          errorNombre.textContent = "El email es obligatorio.";
      }
      if (!password) {
          errorPass.textContent = "La contraseña es obligatoria.";
      }
      return;
  }

  try {
      let respuesta = await fetch(API_URL);
      let usuarios = await respuesta.json();

      let usuario = usuarios.find(user => user.user === email.split('@')[0]);

      if (usuario && usuario.pass === password) {
          sessionStorage.setItem("user", usuario.user);

          alert("Inicio de sesión exitoso. ¡Bienvenido, " + usuario.user + "!");
          document.getElementById('login').reset();

          // Redirigimos a la galería
          window.location.href = "index.html";
      } else {
          alert("Email o contraseña incorrectos. Inténtalo de nuevo.");
      }
  } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al intentar iniciar sesión.");
  }
});
