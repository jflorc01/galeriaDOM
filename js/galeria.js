// Generar un ID único para cada bar
let ultimoId = 0;

function generarId() {
  ultimoId += 1;
  return `bar${ultimoId}`;
}

// Agregar IDs únicos a los bares iniciales
const bares = [
  { id: generarId(), nombre: 'Bar La Catedral', tapa: 'Tapa de tortilla de patatas con pimiento y mayonesa.', imagen: 'img/Tortilla-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Taberna El rincón', tapa: 'Tapa de pizza de jamón y queso con base de arroz.', imagen: 'img/Pizza-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Mesón El Húmedo', tapa: 'Tapa de patatas bravas con pimentón.', imagen: 'img/patatasBravas-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Bar La Plaza', tapa: 'Tapa de orejas de cerdo guisadas.', imagen: 'img/Oreja-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Taberna El Camino', tapa: 'Tapa de morcilla con queso de cabra.', imagen: 'img/Morcilla-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Bar La Cuevina', tapa: 'Tapa de patatas con huevo y jamón.', imagen: 'img/huevos-1080.webp', favorito: false },
  { id: generarId(), nombre: 'La Botica del Vino', tapa: 'Croqueta de Cecina con Corazón de Queso de Valdeón y Miel.', imagen: 'img/croquetas-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Bar Las Médulas', tapa: 'Patatas de bastón con salsa rosa.', imagen: 'img/bravas3-1080.webp', favorito: false },
  { id: generarId(), nombre: 'El Yelmo y la Caña', tapa: 'Bocadillo de jalapeños.', imagen: 'img/bocadilloJalapenos-1080.webp', favorito: false },
  { id: generarId(), nombre: 'La Catedral del Tapeo', tapa: 'Montadito de albóndigas.', imagen: 'img/albondiga-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Bar los lobos', tapa: 'Alitas de pollo.', imagen: 'img/AlitasPollo-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Casa Julián', tapa: 'Patatas bravas.', imagen: 'img/patatasBravas2-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Bar Donde Benito', tapa: 'Tortilla de patatas con pimiento rojo.', imagen: 'img/TortillaPro-1080.webp', favorito: false },
  { id: generarId(), nombre: 'Tony\'s', tapa: 'Bocadillo de panceta', imagen: 'img/BocadilloBacon.webp', favorito: false },
  { id: generarId(), nombre: 'Bar-barie', tapa: 'Pulpo cocido y a la brasa con patata.', imagen: 'img/pulpo.webp', favorito: false },
];

const maxTarjetasPag = 12;
const galeria = document.getElementById('galeria');
const formularioAñadirBar = document.getElementById('formularioAñadirBar');
const checkFiltrar = document.getElementById("checkFiltrar");
const listaPaginas = document.getElementById("listaPaginas");

let paginaActual = 1;

// Función para generar las tarjetas en la galería
function imprimirGaleria(filtrarFavoritos = false) {
  galeria.innerHTML = '';
  const baresFiltrados = filtrarFavoritos ? bares.filter(bar => bar.favorito) : bares;

  if (baresFiltrados.length === 0) {
    galeria.innerHTML = `<p class="text-center display-6 text-danger w-100">No hay bares para mostrar.</p>`;
    galeria.classList.add('d-flex', 'justify-content-center');
    return;
  } else {
    galeria.classList.remove('d-flex', 'justify-content-center');
  }

  const inicio = maxTarjetasPag * (paginaActual - 1);
  const fin = inicio + maxTarjetasPag;
  const baresPagina = baresFiltrados.slice(inicio, fin);

  baresPagina.forEach(bar => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML = `
      <div class="ratio ratio-4x3 overflow-hidden">
        <img loading='lazy' class="card-img-top" src="${bar.imagen || 'img/placeholder.jpg'}" alt="${bar.tapa}">
      </div>
      <div class="card-body">
        <h3>${bar.nombre}</h3>
        <p>${bar.tapa}</p>
      </div>
      <div class="tarjeta-botones">
        <button class="btn btn-light" onclick="alternarFavorito('${bar.id}')">${bar.favorito ? `<img src='img/heart-fill.svg'>` : `<img src='img/heart.svg'>`}</button>
        <button class="btn btn-light" onclick="editarBar('${bar.id}')">Editar</button>
        <button class="btn btn-light" onclick="eliminarBar('${bar.id}')">Eliminar</button>
      </div>
    `;
    galeria.appendChild(tarjeta);
  });

  actualizarNavegacion(filtrarFavoritos);
}

// Función para añadir un nuevo bar
formularioAñadirBar.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombreBar = document.getElementById('nombreBar').value;
  const nombreTapa = document.getElementById('nombreTapa').value;
  const urlImagen = document.getElementById('urlImagen').value;
  const alertaAñadir = document.getElementById('alertaAñadir');

  bares.push({ id: generarId(), nombre: nombreBar, tapa: nombreTapa, imagen: urlImagen, favorito: false });

  imprimirGaleria();
  formularioAñadirBar.reset();

  alertaAñadir.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
  alertaAñadir.innerHTML= `
    <strong>¡Tapa añadida!</strong> La tapa del bar ${nombreBar} se ha añadido correctamente
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
});

// Función para alternar favoritos
function alternarFavorito(id) {
  const bar = bares.find(bar => bar.id === id);
  if (bar) bar.favorito = !bar.favorito;
  imprimirGaleria(checkFiltrar.checked);
}

// Función para editar un bar
function editarBar(id) {
  const bar = bares.find(bar => bar.id === id);
  if (!bar) return;

  const tarjeta = document.querySelector(`#galeria .card:has(button[onclick*="${id}"]) .card-body`);
  const botones = document.querySelector(`#galeria .card:has(button[onclick*="${id}"]) .tarjeta-botones`);

  tarjeta.innerHTML = `
    <input type="text" class="form-control mb-2" value="${bar.nombre}">
    <textarea class="form-control">${bar.tapa}</textarea>
  `;
  botones.innerHTML = `
    <button class="btn btn-dark" onclick="guardarEdicion('${id}')">Guardar</button>
    <button class="btn btn-light" onclick="imprimirGaleria()">Cancelar</button>
  `;
}

// Función para guardar la edición de un bar
function guardarEdicion(id) {
  const tarjeta = document.querySelector(`#galeria .card:has(button[onclick*="${id}"]) .card-body`);
  const nuevoNombre = tarjeta.children[0].value;
  const nuevaTapa = tarjeta.children[1].value;

  if (nuevoNombre && nuevaTapa) {
    const bar = bares.find(bar => bar.id === id);
    if (bar) {
      bar.nombre = nuevoNombre;
      bar.tapa = nuevaTapa;
      imprimirGaleria(checkFiltrar.checked);
    }
  }
}

// Función para eliminar un bar
function eliminarBar(id) {
  const indice = bares.findIndex(bar => bar.id === id);
  if (indice !== -1) {
    bares.splice(indice, 1);
    imprimirGaleria(checkFiltrar.checked);
  }
}

// Actualizar navegación de paginación
function actualizarNavegacion(filtrarFavoritos = false) {
  listaPaginas.innerHTML = '';
  const baresFiltrados = filtrarFavoritos ? bares.filter(bar => bar.favorito) : bares;
  const totalPaginas = Math.ceil(baresFiltrados.length / maxTarjetasPag);

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement('button');
    boton.classList.add('btn', 'btn-light', 'mx-1', 'btnPaginas');
    boton.textContent = i;
    if (i === paginaActual) boton.classList.add('active');
    boton.addEventListener('click', () => {
      paginaActual = i;
      imprimirGaleria(filtrarFavoritos);
    });
    listaPaginas.appendChild(boton);
  }
}

// Inicialización de la galería y paginación
checkFiltrar.addEventListener('change', () => {
  paginaActual = 1;
  imprimirGaleria(checkFiltrar.checked);
});

imprimirGaleria();
