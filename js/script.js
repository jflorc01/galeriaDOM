// Datos iniciales
const bares = [
    { nombre: 'Bar A', tapa: 'Tapa A', imagen: 'img/AlitasPollo-1080.webp', favorito: false },
    { nombre: 'Bar B', tapa: 'Tapa B', imagen: 'img/patatasBravas-1080.webp', favorito: false },
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
      tarjeta.classList.add('tarjeta');
      tarjeta.innerHTML = `
        <img src="${bar.imagen || 'img/placeholder.jpg'}" alt="${bar.tapa}">
        <div class="tarjeta-contenido">
          <h3>${bar.nombre}</h3>
          <p>${bar.tapa}</p>
        </div>
        <div class="tarjeta-botones">
          <button onclick="alternarFavorito(${indice})">${bar.favorito ? '💖' : '🤍'}</button>
          <button onclick="editarBar(${indice})">Editar</button>
          <button onclick="eliminarBar(${indice})">Eliminar</button>
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
  