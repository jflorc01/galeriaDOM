const API_URL = 'http://localhost:3000/';
const TAPAS_POR_PAGINA = 12;
const galeria = document.getElementById('galeria');
const formularioAñadirBar = document.getElementById('formularioAñadirBar');
const checkFiltrar = document.getElementById("checkFiltrar");
const listaPaginas = document.getElementById("listaPaginas");

let paginaActual = 1;

if(!sessionStorage.getItem("rol")){
    sessionStorage.setItem("rol", "invitado");
}
let rol = sessionStorage.getItem("rol");

async function obtenerTotalTapas(tapa="") {
    try {
      const respuesta = await fetch(`${API_URL}tapas/?tapa=${tapa}`);
      const tapas = await respuesta.json();
      // totalPaginas = Math.ceil(tapas.length / TAPAS_POR_PAGINA);
      console.log(tapas);
      imprimirGaleria(tapas);
    } catch (error) {
      console.error('Error al obtener el total de tapas:', error);
    }
  }

let tapas = obtenerTotalTapas();
console.log(tapas);

// function imprimirGaleria(filtrarFavoritos = false, bares) {
//   galeria.innerHTML = '';
//   const baresFiltrados = filtrarFavoritos ? bares.filter(bar => bar.favorito) : bares;

//   if (baresFiltrados.length === 0) {
//     galeria.innerHTML = `<p class="text-center display-6 text-danger w-100">No hay bares para mostrar.</p>`;
//     galeria.classList.add('d-flex', 'justify-content-center');
//     return;
//   } else {
//     galeria.classList.remove('d-flex', 'justify-content-center');
//   }

//   const inicio = maxTarjetasPag * (paginaActual - 1);
//   const fin = inicio + maxTarjetasPag;
//   const baresPagina = baresFiltrados.slice(inicio, fin);

//   baresPagina.forEach(bar => {
//     const tarjeta = document.createElement('div');
//     tarjeta.classList.add('card');
//     tarjeta.innerHTML = `
//       <div class="ratio ratio-4x3 overflow-hidden">
//         <img loading='lazy' class="card-img-top" src="${bar.imagen || 'img/placeholder.jpg'}" alt="${bar.tapa}">
//       </div>
//       <div class="card-body">
//         <h3>${bar.bar}</h3>
//         <p>${bar.tapa}</p>
//       </div>
//       <div class="tarjeta-botones">
//         <button class="btn btn-light" onclick="alternarFavorito('${bar.id}')" name='boton añadir a favoritos' >${bar.favorito ? `<img src='img/heart-fill.svg' alt='boton añadir a favoritos'>` : `<img src='img/heart.svg' alt='boton añadir a favoritos'>`}</button>
//         <button class="btn btn-light" onclick="editarBar('${bar.id}')">Editar</button>
//         <button class="btn btn-light" onclick="eliminarBar('${bar.id}')">Eliminar</button>
//       </div>
//     `;
//     galeria.appendChild(tarjeta);
//   });

//   actualizarNavegacion(filtrarFavoritos);
// }

function imprimirGaleria(tapas){
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
        <img loading='lazy' class='card-img-top' src='${'img/' + tapa.id + '.webp' || 'img/placeholder.jpg'}' alt='${tapa.tapa}'>
      </div>
      <div class='card-body'>
        <h3>${tapa.bar}</h3>
        <p>${tapa.tapa}</p>
      </div>
      <div class='tarjeta-botones'>
        <!-- <button class='btn btn-light' onclick="alertaIngredientes('${tapa.nombre}', '${tapa.ingredientes}')">Ingredientes</button> -->
        <!-- <button class='btn btn-light' onclick='alert("hola")'>Eliminar</button> -->
      </div>
    `;
    galeria.appendChild(tarjeta);
  }
}