const contenedorEventosMain = document.querySelector("#contenedorEventosMain");
const eventosGlobal = await obtenerEventos();
console.log(eventosGlobal);
console.log("ID usuario logueado:", localStorage.getItem("usuarioLogueadoId"));

//Obtiene todos los eventos que hay una sola ves
async function obtenerEventos() {
  const response = await fetch(`${URLbase}/eventos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}


//Listamos todos los eventos basados en el array de eventos que le enviamos
async function listarEventos(arrayEventos) {
  try {
    contenedorEventosMain.innerHTML = "";
    arrayEventos.forEach((evento) => {
      contenedorEventosMain.innerHTML += `
        <div class="evento">
          <img src="${evento.linksImagenes[0] || ""
        }" alt="imagen de evento" class="imagenEventoMain">
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
                            <a class="botonAmarilloTiny" id="${evento._id
        }" href="paginaEvento.html?id=${evento._id
        }">Ver evento</a>
                        </div>
        </div>

      `;
    });
    console.log("eventos cargados")
  } catch (e) {
    console.log("Error al listar los eventos");
  }
}
//Carga inicial de eventos, con todos los eventos ordenados de forma aleatoria
cargarInicial();
async function cargarInicial() {
  const arrayEventos = eventosGlobal;
  listarEventos(arrayEventos);
}

//FILTROS//

//Filtro que ordena la base de datos por precio, los filtros no se acumulan, filtra toda la base de datos de nuevo
const botonPrecioMain = document.querySelector("#botonPrecioMain");
botonPrecioMain.addEventListener("click", filtrarPrecio);
let filtroPrecio = 0;

//Si filtroPrecio es 0 lo cambia a 1 y si es uno a 2. 1 es de mayor a menor y 2 de menor a mayor
async function filtrarPrecio() {
  console.log("Filtrando por precio");
  if (filtroPrecio === 0) {
    filtroPrecio = 1;
    botonPrecioMain.style.backgroundColor = "#FFD700";

    try {
      const arrayEventos = eventosGlobal;
      console.log(typeof arrayEventos[0].precio);
      const eventosOrdenados = [...arrayEventos].sort(
        (b, a) => a.precio - b.precio
      );
      listarEventos(eventosOrdenados);
    } catch (e) {
      console.log("Error al filtrar por precio");
    }
  } else if (filtroPrecio === 1) {
    filtroPrecio = 2;
    botonPrecioMain.style.backgroundColor = "#ff00eaff";
    try {
      const arrayEventos = eventosGlobal;
      console.log(typeof arrayEventos[0].precio);
      const eventosOrdenados = [...arrayEventos].sort(
        (a, b) => a.precio - b.precio
      );
      listarEventos(eventosOrdenados);
    } catch (e) {
      console.log("Error al filtrar por precio");
    }
  } else {
    botonPrecioMain.style.backgroundColor = "#FFFFFF";
    filtroPrecio = 0;
    cargarInicial();
  }
}

// Toggle de el boton de filtro de categorias
document.querySelector("#btnFiltrarMain").addEventListener("click", () => {
  const listaExplorar = document.querySelector("#listaExplorarMain");

  if (listaExplorar.style.display === "block") {
    listaExplorar.style.display = "none";
  } else {
    listaExplorar.style.display = "block";
  }
});

// Cargamos la categorias dinamicamente, si quisieramos armar mas categorias seria mas facil. Tambien hace los listeners
function cargarCategorias() {
  console.log("Cargando categorias");
  let categorias = [];
  const eventos = eventosGlobal;
  eventos.forEach((evento) => {
    if (evento.categoria && !categorias.includes(evento.categoria)) {
      categorias.push(evento.categoria);
    }
  });
  tiposDeEventosDropDown.innerHTML = "";
  categorias.forEach((categoria) => {
    tiposDeEventosDropDown.innerHTML += `
                <div id="${categoria}" class="categoriaMenuIni">
                    <p>${categoria}</p>
                </div>
        `;
  });
  //Crea los listeners para todos los items con clase .categoriaMenuIni
  const itemsCategoria = document.querySelectorAll(".categoriaMenuIni");
  itemsCategoria.forEach((item) => {
    item.addEventListener("click", function () {
      const cat = this.id;
      filtrarPorEvento(cat);
    });
  });
}


//Filtra por evento mandanole la lista a listarEventos
function filtrarPorEvento(categoria) {
  console.log("entraste en " + categoria);
  const eventos = eventosGlobal;
  const eventosFiltrados = [];
  eventos.forEach((evento) => {
    if (evento.categoria === categoria) {
      eventosFiltrados.push(evento);
    }
    listarEventos(eventosFiltrados);
  });
}


//Filtros  de presencialidad o de edad, etc.
const filtrarEventosPresencial = document.querySelector(
  "#filtrarEventosPresencial"
);
const filtrarEventosVirtuales = document.querySelector(
  "#filtrarEventosVirtuales"
);
filtrarEventosPresencial.addEventListener("click", filtrarPresenciales);
filtrarEventosVirtuales.addEventListener("click", filtrarVirtuales);


//Envia true o false porque eso es lo que lee el preset de evento
function filtrarPresenciales() {
  filtrarPresencialVirtual(true);
}

function filtrarVirtuales() {
  filtrarPresencialVirtual(false);
}

//Dependiendo de si es true o false el valor filtra diferentes eventos, fácil.
function filtrarPresencialVirtual(valor) {
  console.log("filtraste por " + valor);
  const eventos = eventosGlobal;
  const eventosFiltrados = [];
  eventos.forEach((evento) => {
    if (evento.presencial === valor) {
      eventosFiltrados.push(evento);
    }
    listarEventos(eventosFiltrados);
  });
}


//Toggle de tipo de eventos, on/off
const tipoDeEventoSelect = document.querySelector("#tipoDeEventoSelect");
tipoDeEventoSelect.addEventListener("click", dropdownTipoDeEvento);
let tipoDeEventoAbierto = true;
const tiposDeEventosDropDown = document.querySelector(
  "#tiposDeEventosDropDown"
);
cargarCategorias();

function dropdownTipoDeEvento() {
  console.log("click en tipo de evento");
  if (tipoDeEventoAbierto === true) {
    tipoDeEventoAbierto = false;
    tiposDeEventosDropDown.style.display = "none";
  } else {
    tipoDeEventoAbierto = true;
    tiposDeEventosDropDown.style.display = "block";
  }
}


//FILTRO FECHA Y BUSCADOR

const elegirFechaMain = document.querySelector("#elegirFechaMain");
elegirFechaMain.addEventListener("change", filtrarFecha);

async function filtrarFecha() {
  const fechaSeleccionada = new Date(elegirFechaMain.value);
  console.log("Filtrando por fecha:", fechaSeleccionada);
}

const inpBuscarMain = document.querySelector("#inpBuscarMain");
inpBuscarMain.addEventListener("input", filtrarBusqueda);

//Filtro de busqueda, busca por titulo, creador, descripcion o categoria
async function filtrarBusqueda() {
  const texto = inpBuscarMain.value.toLowerCase().trim();

  try {
    const eventos = eventosGlobal;
    //Const filtrados que filtra todos los eventos si incluyen en los distintos parametros 
    const filtrados = eventos.filter((evento) => {
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

//Filtro por fecha
function filtrarPorFecha() {
  const eventos = eventosGlobal;
  //se fija si el valor es un date, se supone que siempre es pero a veces revienta todo
  const inicio = inicioInput.value ? new Date(inicioInput.value) : null;
  const fin = finInput.value ? new Date(finInput.value) : null;
  console.log(inicio, fin);
  let eventosFiltrados = [];
  //un for loop para ver si la fecha del evento esta dentro del rango de las dos fechas filtro, solo se activa si los dos input tienen cosas
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
