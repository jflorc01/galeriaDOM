const API_URL = 'http://localhost:3000/';
const TAPAS_POR_PAGINA = 12;
const galeria = document.getElementById('galeria');
const listaPaginas = document.getElementById("listaPaginas");
const checkFiltrar = document.getElementById("checkFiltrar");

// sessionStorage.clear;
sessionStorage.setItem("user", "admin");
let tapas = [];
let paginaActual = 1;
let usuarioActual = null;

async function obtenerUsuario() {
    const user = sessionStorage.getItem("user");
    console.log(user);
    if (!user) return;
    const response = await fetch(`${API_URL}usuarios?user=${user}`);
    const data = await response.json();
    usuarioActual = data.length ? data[0] : null;
}


async function obtenerTapas() {
    try {
        const respuesta = await fetch(`${API_URL}tapas`);
        tapas = await respuesta.json();
        await obtenerUsuario();
        imprimirGaleria();
    } catch (error) {
        console.error('Error al obtener las tapas:', error);
    }
}
// obtenerUsuario().then(user => console.log(user));


function imprimirGaleria(filtrarFavoritos = false) {
    galeria.innerHTML = '';
    
    let tapasFiltradas = filtrarFavoritos && usuarioActual ? tapas.filter(tapa => usuarioActual.favoritos.includes(tapa.id)) : tapas;
    if (tapasFiltradas.length === 0) {
        galeria.innerHTML = `<p class='text-center text-danger w-100'>No hay bares para mostrar.</p>`;
        return;
    }

    const inicio = TAPAS_POR_PAGINA * (paginaActual - 1);
    const fin = inicio + TAPAS_POR_PAGINA;
    const tapasPagina = tapasFiltradas.slice(inicio, fin);

    tapasPagina.forEach(tapa => {
        const esFavorito = usuarioActual && usuarioActual.favoritos.includes(tapa.id);
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
            <div class='ratio ratio-4x3 overflow-hidden'>
                <img class='card-img-top' src='${tapa.imagen || "img/placeholder.jpg"}' alt='${tapa.tapa}'>
            </div>
            <div class='card-body'>
                <h3>${tapa.bar}</h3>
                <p>${tapa.tapa}</p>
            </div>
            <div class='tarjeta-botones'>
                ${usuarioActual ? `<button class='btn btn-light fav' onclick='alternarFavorito(${tapa.id})'>
                    <img src='img/${esFavorito ? "heart-fill" : "heart"}.svg' alt='favorito'>
                </button>` : ''}
                ${usuarioActual?.rol === "admin" ? `
                    <button class='btn btn-light edit' onclick='editarBar(${tapa.id})'>Editar</button>
                    <button class='btn btn-light delete' onclick='eliminarBar(${tapa.id})'>Eliminar</button>
                ` : ''}
            </div>
        `;
        galeria.appendChild(tarjeta);
    });

    actualizarNavegacion(tapasFiltradas.length);
}

async function alternarFavorito(id) {
    if (!usuarioActual) return;
    let nuevosFavoritos = usuarioActual.favoritos.includes(id)
        ? usuarioActual.favoritos.filter(fav => fav !== id)
        : [...usuarioActual.favoritos, id];
    
    await fetch(`${API_URL}usuarios/${usuarioActual.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoritos: nuevosFavoritos })
    });
    usuarioActual.favoritos = nuevosFavoritos;
    imprimirGaleria(checkFiltrar.checked);
}

async function eliminarBar(id) {
    await fetch(`${API_URL}tapas/${id}`, { method: 'DELETE' });
    tapas = tapas.filter(tapa => tapa.id !== id);
    imprimirGaleria(checkFiltrar.checked);
}

function editarBar(id) {
    const tapa = tapas.find(t => t.id === id);
    if (!tapa) return;

    const tarjeta = document.querySelector(`.card:has(button[onclick*='${id}']) .card-body`);
    const botones = document.querySelector(`.card:has(button[onclick*='${id}']) .tarjeta-botones`);

    tarjeta.innerHTML = `
        <input type='text' class='form-control mb-2' value='${tapa.bar}'>
        <textarea class='form-control'>${tapa.tapa}</textarea>
    `;
    botones.innerHTML = `
        <button class='btn btn-dark' onclick='guardarEdicion(${id})'>Guardar</button>
        <button class='btn btn-light' onclick='imprimirGaleria()'>Cancelar</button>
    `;
}

async function guardarEdicion(id) {
    const tarjeta = document.querySelector(`.card:has(button[onclick*='${id}']) .card-body`);
    const nuevoBar = tarjeta.children[0].value;
    const nuevaTapa = tarjeta.children[1].value;

    if (nuevoBar && nuevaTapa) {
        const tapa = tapas.find(t => t.id === id);
        tapa.bar = nuevoBar;
        tapa.tapa = nuevaTapa;

        await fetch(`${API_URL}tapas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tapa)
        });

        imprimirGaleria(checkFiltrar.checked);
    }
}

function actualizarNavegacion(totalTapas) {
    listaPaginas.innerHTML = '';
    const totalPaginas = Math.ceil(totalTapas / TAPAS_POR_PAGINA);

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.classList.add('btn', 'btn-light', 'mx-1', 'btnPaginas');
        boton.textContent = i;
        if (i === paginaActual) boton.classList.add('active');
        boton.addEventListener('click', () => {
            paginaActual = i;
            imprimirGaleria(checkFiltrar.checked);
        });
        listaPaginas.appendChild(boton);
    }
}

checkFiltrar.addEventListener('change', () => {
    paginaActual = 1;
    imprimirGaleria(checkFiltrar.checked);
});

console.log(usuarioActual);
obtenerTapas();
