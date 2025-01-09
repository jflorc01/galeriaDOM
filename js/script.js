// Datos iniciales
const bares = [
    { nombre: 'Bar La Catedral', tapa: 'Tapa de tortilla de patatas con pimiento y mayonesa.', imagen: 'img/Tortilla-1080.webp', favorito: false },
    { nombre: 'Taberna El rincón', tapa: 'Tapa de pizza de jamón y queso con base de arroz.', imagen: 'img/Pizza-1080.webp', favorito: false },
    { nombre: 'Mesón El Húmedo', tapa: 'Tapa de patatas bravas con pimentón.', imagen: 'img/patatasBravas-1080.webp', favorito: false },
    { nombre: 'Bar La Plaza', tapa: 'Tapa de orejas de cerdo guisadas.', imagen: 'img/Oreja-1080.webp', favorito: false },
    { nombre: 'Taberna El Camino', tapa: 'Tapa de morcilla con queso de cabra.', imagen: 'img/Morcilla-1080.webp', favorito: false },
    { nombre: 'Bar La Cuevina', tapa: 'Tapa de patatas con huevo y jamón.', imagen: 'img/huevos-1080.webp', favorito: false },
    { nombre: 'La Botica del Vino', tapa: 'Croqueta de Cecina con Corazón de Queso de Valdeón y Miel.', imagen: 'img/croquetas-1080.webp', favorito: false },
    { nombre: 'Bar Las Médulas', tapa: 'Patatas de bastón con salsa rosa.', imagen: 'img/bravas3-1080.webp', favorito: false },
    { nombre: 'El Yelmo y la Caña', tapa: 'Bocadillo de jalapeños.', imagen: 'img/bocadilloJalapenos-1080.webp', favorito: false },
    { nombre: 'La Catedral del Tapeo', tapa: 'Montadito de albóndigas.', imagen: 'img/albondiga-1080.webp', favorito: false },
  ];
  
  const galeria = document.getElementById('galeria');
  const formularioAñadirBar = document.getElementById('formularioAñadirBar');
  const botonFiltrarFavoritos = document.getElementById('botonFiltrarFavoritos');
  
  // Función para generar las tarjetas en la galería
  function imprimirGaleria(filtrarFavoritos = false) {
    galeria.innerHTML = '';
    const baresFiltrados = filtrarFavoritos ? bares.filter(bar => bar.favorito) : bares;
  
    baresFiltrados.forEach((bar, indice) => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('card');
      tarjeta.innerHTML = `
        <img class="card-img-top" src="${bar.imagen || 'img/placeholder.jpg'}" alt="${bar.tapa}">
        <div class="card-body">
          <h3>${bar.nombre}</h3>
          <p>${bar.tapa}</p>
        </div>
        <div class="tarjeta-botones">
          <button class="btn btn-light" onclick="alternarFavorito(${indice})">${bar.favorito ? `<img src='img/heart-fill.svg'>` : `<img src='img/heart.svg'>`}</button>
          <button class="btn btn-light" onclick="editarBar(${indice})">Editar</button>
          <button class="btn btn-light" onclick="eliminarBar(${indice})">Eliminar</button>
        </div>
      `;
      galeria.appendChild(tarjeta);
    });
  }
  
  // Función para añadir un nuevo bar
  formularioAñadirBar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreBar = document.getElementById('nombreBar').value;
    const nombreTapa = document.getElementById('nombreTapa').value;
    const urlImagen = document.getElementById('urlImagen').value;
  
    bares.push({ nombre: nombreBar, tapa: nombreTapa, imagen: urlImagen, favorito: false });
    imprimirGaleria();
    formularioAñadirBar.reset();
  });
  
  // Función para alternar favoritos
  function alternarFavorito(indice) {
    bares[indice].favorito = !bares[indice].favorito;
    imprimirGaleria();
  }
  
  // Función para editar un bar
  function editarBar(indice) {
    const nuevoNombre = prompt('Nuevo nombre del bar:', bares[indice].nombre);
    const nuevaTapa = prompt('Nuevo nombre de la tapa:', bares[indice].tapa);
  
    if (nuevoNombre && nuevaTapa) {
      bares[indice].nombre = nuevoNombre;
      bares[indice].tapa = nuevaTapa;
      imprimirGaleria();
    }
  }
  
  // Función para eliminar un bar
  function eliminarBar(indice) {
    bares.splice(indice, 1);
    imprimirGaleria();
  }
  
  // Función para filtrar favoritos
  botonFiltrarFavoritos.addEventListener('click', () => {
    const mostrandoTodos = botonFiltrarFavoritos.textContent === 'Mostrar Todos';
    imprimirGaleria(!mostrandoTodos);
    botonFiltrarFavoritos.textContent = mostrandoTodos ? 'Mostrar Favoritos' : 'Mostrar Todos';
  });
  
  // Renderizado inicial
  imprimirGaleria();
  
  