const API_URL = 'http://localhost/www/concursoTapas/api/';
const galeria = document.getElementById('galeria');
const formularioAñadirBar = document.getElementById('formularioAñadirBar');
const listaPaginas = document.getElementById('listaPaginas');
const TAPAS_POR_PAGINA = 6;
let totalPaginas = 0;
let rol = "invitado";
let busquedaActual = "";

// Obtener todas las tapas para calcular el total de páginas
async function obtenerTotalTapas(nombre="") {
  try {
    const respuesta = await fetch(`${API_URL}/tapas/?nombre=${nombre}`);
    const tapas = await respuesta.json();
    totalPaginas = Math.ceil(tapas.length / TAPAS_POR_PAGINA);
    generarPaginacion(totalPaginas);
  } catch (error) {
    console.error('Error al obtener el total de tapas:', error);
  }
}

// Obtener la lista de tapas desde la API con paginación
async function obtenerTapas(pagina = 1, nombre = "") {
  try {
    const respuesta = await fetch(`${API_URL}/tapas/?pag=${pagina}&nombre=${nombre}`);
    const tapas = await respuesta.json();
    imprimirGaleria(tapas);
  } catch (error) {
    console.error('Error al obtener las tapas:', error);
  }
}

// Función para mostrar la galería de tapas
async function imprimirGaleria(tapas) {
  galeria.innerHTML = '';
  if (tapas.length === 0) {
    galeria.innerHTML = `<p class='text-center display-6 text-danger w-100'>No hay bares para mostrar.</p>`;
    return;
  }

  for (const tapa of tapas) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML = `
      <div class='ratio ratio-4x3 overflow-hidden'>
        <img loading='lazy' class='card-img-top' src='${'img/' + tapa.id_tapa + '.webp' || 'img/placeholder.jpg'}' alt='${tapa.nombre}'>
      </div>
      <div class='card-body'>
        <h3>${tapa.nombre_bar}</h3>
        <p>${tapa.nombre}</p>
      </div>
      <div class='tarjeta-botones'>
        <button class='btn btn-light' onclick="alertaIngredientes('${tapa.nombre}', '${tapa.ingredientes}')">Ingredientes</button>
        <!-- <button class='btn btn-light' onclick='alert("hola")'>Eliminar</button> -->
      </div>
    `;
    galeria.appendChild(tarjeta);
  }
}

// Función para generar los botones de paginación
function generarPaginacion(totalPaginas, paginaActual = 1) {
  listaPaginas.innerHTML = '';
  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.classList.add('btn', 'btn-light', 'me-2');
    boton.textContent = i;
    if (i === paginaActual) {
      boton.classList.add('active');
    }
    boton.addEventListener('click', () => obtenerTapas(i, busquedaActual));
    listaPaginas.appendChild(boton);
  }
}

// Aparece una alerta de SweetAlert con los ingredientes de la tapa
function alertaIngredientes(nombre, ingredientes){
  Swal.fire({
    title: nombre,
    text: `Ingredientes: ${ingredientes}`,
    icon: "info"
  });
}

// Buscador
document.getElementById('formularioBusqueda').addEventListener('submit', (e) => {
  e.preventDefault();
  busquedaActual = document.getElementById('inputBusqueda').value;
  obtenerTotalTapas(busquedaActual);
  obtenerTapas(1, busquedaActual);
});

// Función principal para inicializar la aplicación
async function main() {
  await obtenerTotalTapas();
  await obtenerTapas();
}

// Llamar a la función principal
main();