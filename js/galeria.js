const API_URL = 'http://localhost/www/concursoTapas/api/';
const galeria = document.getElementById('galeria');
const formularioAñadirBar = document.getElementById('formularioAñadirBar');
const listaPaginas = document.getElementById('listaPaginas');
const TAPAS_POR_PAGINA = 6;
let totalPaginas = 0;

// Obtener todas las tapas para calcular el total de páginas
async function obtenerTotalTapas() {
  try {
    const respuesta = await fetch(`${API_URL}/tapas/`);
    const tapas = await respuesta.json();
    totalPaginas = Math.ceil(tapas.length / TAPAS_POR_PAGINA);
    generarPaginacion(totalPaginas);
  } catch (error) {
    console.error('Error al obtener el total de tapas:', error);
  }
}

// Obtener la lista de tapas desde la API con paginación
async function obtenerTapas(pagina = 1) {
  try {
    const respuesta = await fetch(`${API_URL}/tapas/?pag=${pagina}`);
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
        <img loading='lazy' class='card-img-top' src='${'img/' + tapa.id_tapa + '.webp' || 'img/placeholder.jpg'}' alt='${tapa.tapa}'>
      </div>
      <div class='card-body'>
        <h3>${tapa.nombre_bar}</h3>
        <p>${tapa.nombre}</p>
      </div>
      <div class='tarjeta-botones'>
        <button class='btn btn-light' onclick='editarBar(${tapa.id})'>Editar</button>
        <button class='btn btn-light' onclick='eliminarBar(${tapa.id})'>Eliminar</button>
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
    boton.addEventListener('click', () => obtenerTapas(i));
    listaPaginas.appendChild(boton);
  }
}

// Función principal para inicializar la aplicación
async function main() {
  await obtenerTotalTapas();
  await obtenerTapas();
}

// Llamar a la función principal
main();

// Agregar un nuevo bar
// formularioAñadirBar.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const nombreBar = document.getElementById('nombreBar').value;
//   const nombreTapa = document.getElementById('nombreTapa').value;
//   const urlImagen = document.getElementById('urlImagen').value;

//   try {
//     // Código para agregar un nuevo bar
//   } catch (error) {
//     console.error('Error al agregar el bar:', error);
//   }
// });

// // Eliminar un bar
// async function eliminarBar(id) {
//   try {
//     await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//     obtenerBares();
//   } catch (error) {
//     console.error('Error al eliminar el bar:', error);
//   }
// }

// // Editar un bar
// async function editarBar(id) {
//   const nuevoNombre = prompt('Nuevo nombre del bar:');
//   const nuevaTapa = prompt('Nueva descripción de la tapa:');
//   if (!nuevoNombre || !nuevaTapa) return;

//   try {
//     await fetch(`${API_URL}/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ nombre: nuevoNombre, tapa: nuevaTapa })
//     });
//     obtenerBares();
//   } catch (error) {
//     console.error('Error al editar el bar:', error);
//   }
// }
