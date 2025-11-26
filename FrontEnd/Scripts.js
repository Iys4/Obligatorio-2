const contenedorEventosMain = document.querySelector('#contenedorEventosMain');
const eventosGlobal = await obtenerEventos();
console.log(eventosGlobal);
console.log("ID usuario logueado:", localStorage.getItem("usuarioLogueadoId"));
async function obtenerEventos() {
  const response = await fetch('http://localhost:3000/eventos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}


async function listarEventos(arrayEventos) {
  try {
    contenedorEventosMain.innerHTML = "";

    arrayEventos.forEach(evento => {
      console.log(evento);
      contenedorEventosMain.innerHTML += `
        <div class="evento">
          <img src="${evento.linksImagenes[0] || ''}" alt="imagen de evento" class="imagenEventoMain">
          <h4>${evento.nombreEvento}</h4>
          <h5>${new Date(evento.fecha).toLocaleDateString()}</h5>
          <div class="ubicacionEvento">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6663 8.33317C16.6663 12.494 12.0505 16.8273 10.5005 18.1657C10.3561 18.2742 10.1803 18.333 9.99967 18.333C9.81901 18.333 9.64324 18.2742 9.49884 18.1657C7.94884 16.8273 3.33301 12.494 3.33301 8.33317C3.33301 6.56506 4.03539 4.86937 5.28563 3.61913C6.53587 2.36888 8.23156 1.6665 9.99967 1.6665C11.7678 1.6665 13.4635 2.36888 14.7137 3.61913C15.964 4.86937 16.6663 6.56506 16.6663 8.33317Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.99967 10.8332C11.3804 10.8332 12.4997 9.71388 12.4997 8.33317C12.4997 6.95246 11.3804 5.83317 9.99967 5.83317C8.61896 5.83317 7.49967 6.95246 7.49967 8.33317C7.49967 9.71388 8.61896 10.8332 9.99967 10.8332Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>${evento.location}</p>
          </div>
          <div class="tagsEvento">
            ${evento.categoria}
          </div>
              <div id="eventosYBoton">
              <p>$${evento.precio}</p>
                            <a class="botonAmarilloTiny" id="${evento._id}" href="paginaEvento.html?id=${evento._id}">Ver evento</a>
                        </div>
        </div>

      `;
    });
  }
  catch (e) {
    console.log('Error al listar los eventos');
  }
}
cargarInicial();
async function cargarInicial() {
  const arrayEventos = eventosGlobal;
  listarEventos(arrayEventos);
}

const botonPrecioMain = document.querySelector('#botonPrecioMain');
botonPrecioMain.addEventListener('click', filtrarPrecio);
async function filtrarPopulares() {
  console.log('Filtrando por populares');
}
async function filtrarSiguiendo() {
  console.log('Filtrando por siguiendo');
}
let filtroPrecio = 0;
async function filtrarPrecio() {
  console.log('Filtrando por precio');
  if (filtroPrecio === 0) {
    filtroPrecio = 1;
    botonPrecioMain.style.backgroundColor = '#FFD700';

    try {
      const arrayEventos = eventosGlobal;
      console.log(typeof arrayEventos[0].precio);
      const eventosOrdenados = [...arrayEventos].sort((b, a) => a.precio - b.precio);
      listarEventos(eventosOrdenados);
    } catch (e) {
      console.log('Error al filtrar por precio');
    }
  } else if (filtroPrecio === 1) {
    filtroPrecio = 2;
    botonPrecioMain.style.backgroundColor = '#ff00eaff';
    try {
      const arrayEventos = eventosGlobal;
      console.log(typeof arrayEventos[0].precio);
      const eventosOrdenados = [...arrayEventos].sort((a, b) => a.precio - b.precio);
      listarEventos(eventosOrdenados);
    } catch (e) {
      console.log('Error al filtrar por precio');
    }
  } else {
    botonPrecioMain.style.backgroundColor = '#FFFFFF';
    filtroPrecio = 0;
    cargarInicial();
  }
}


function cargarCategorias() {
  console.log('Cargando categorias');
  let categorias = [];
  const eventos = eventosGlobal;
  eventos.forEach(evento => {
    if (evento.categoria && !categorias.includes(evento.categoria)) {
      categorias.push(evento.categoria);
    }});
    tiposDeEventosDropDown.innerHTML = '';
    categorias.forEach(categoria => {
      tiposDeEventosDropDown.innerHTML += `
                <div id="${categoria}" class="categoriaMenuIni">
                    <p>${categoria}</p>
                </div>
        `;
    });
        const itemsCategoria = document.querySelectorAll(".categoriaMenuIni")
        itemsCategoria.forEach(item => {item.addEventListener("click", function() {
          const cat = this.id;
          filtrarPorEvento(cat);
        })})

}
//Filtra por evento mandanole la categoria
function filtrarPorEvento(categoria) {
console.log("entraste en " + categoria)
  const eventos = eventosGlobal;
  const eventosFiltrados = [];
  eventos.forEach(evento => {
    if (evento.categoria === categoria) {
      eventosFiltrados.push(evento);
    }
    listarEventos(eventosFiltrados);
  });
}

const filtrarEventosPresencial = document.querySelector("#filtrarEventosPresencial");
const filtrarEventosVirtuales = document.querySelector("#filtrarEventosVirtuales");
filtrarEventosPresencial.addEventListener ("click", filtrarPresenciales);
filtrarEventosVirtuales.addEventListener ("click", filtrarVirtuales);

function filtrarPresenciales(){
  filtrarPresencialVirtual(true);
}

function filtrarVirtuales(){
  filtrarPresencialVirtual(false);
}

function filtrarPresencialVirtual(valor) {
  console.log("filtraste por " + valor)
  const eventos = eventosGlobal;
  const eventosFiltrados = [];
  eventos.forEach(evento => {
    if (evento.presencial === valor) {
      eventosFiltrados.push(evento);
    }
    listarEventos(eventosFiltrados);
  });
}

const tipoDeEventoSelect = document.querySelector('#tipoDeEventoSelect');
tipoDeEventoSelect.addEventListener('click', dropdownTipoDeEvento);
let tipoDeEventoAbierto = true;
const tiposDeEventosDropDown = document.querySelector('#tiposDeEventosDropDown');
cargarCategorias();

function dropdownTipoDeEvento() {
  console.log('click en tipo de evento');
  if (tipoDeEventoAbierto === true) {
    tipoDeEventoAbierto = false;
    tiposDeEventosDropDown.style.display = "none";
  } else {
    tipoDeEventoAbierto = true;
    tiposDeEventosDropDown.style.display = "block";
  }
}

const elegirFechaMain = document.querySelector('#elegirFechaMain');
elegirFechaMain.addEventListener('change', filtrarFecha);

async function filtrarFecha() {
  const fechaSeleccionada = new Date(elegirFechaMain.value);
  console.log('Filtrando por fecha:', fechaSeleccionada);
}

const inpBuscarMain = document.querySelector('#inpBuscarMain');
inpBuscarMain.addEventListener('input', filtrarBusqueda);

async function filtrarBusqueda() {
  const texto = inpBuscarMain.value.toLowerCase().trim();

  try {
    const eventos = eventosGlobal;

    const filtrados = eventos.filter(evento => {
      const nombre = evento.nombreEvento?.toLowerCase() || "";
      const creador = Array.isArray(evento.creadorEvento)
        ? evento.creadorEvento.join(" ").toLowerCase()
        : "";
      const categoria = evento.categoria?.toLowerCase() || "";
      const descripcion = evento.descripcion?.toLowerCase() || "";

      return (
        nombre.includes(texto) ||
        creador.includes(texto) ||
        categoria.includes(texto) ||
        descripcion.includes(texto)
      );
    });

    listarEventos(filtrados);

  } catch (error) {
    console.error("Error al filtrar la búsqueda:", error);
  }
}



const inicioInput = document.querySelector("#elegirFechaMain");
const finInput = document.querySelector("#elegirFechaFinalMain");


function filtrarPorFecha() {
  const eventos = eventosGlobal;
  const inicio = inicioInput.value ? new Date(inicioInput.value) : null;
  const fin = finInput.value ? new Date(finInput.value) : null;
  console.log(inicio, fin);
  let eventosFiltrados = [];
  for (let i = 0; i < eventos.length; i++) {
    const element = eventos[i];
    const fechaEvento = new Date(element.fecha);
    if (
      (inicio === null || fechaEvento >= inicio) &&
      (fin === null || fechaEvento <= fin)
    ) {
      eventosFiltrados.push(element);
    }
  }
  listarEventos(eventosFiltrados);
}

inicioInput.addEventListener("change", filtrarPorFecha);
finInput.addEventListener("change", filtrarPorFecha);
