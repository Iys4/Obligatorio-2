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
              <button class="botonAmarilloTiny">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.37645 1.46901C7.4045 1.41234 7.44782 1.36464 7.50154 1.33129C7.55525 1.29794 7.61722 1.28027 7.68045 1.28027C7.74367 1.28027 7.80564 1.29794 7.85936 1.33129C7.91308 1.36464 7.9564 1.41234 7.98445 1.46901L9.46285 4.46357C9.56024 4.66066 9.70401 4.83119 9.88181 4.9605C10.0596 5.0898 10.2661 5.17404 10.4836 5.20597L13.7899 5.68981C13.8525 5.69888 13.9114 5.72531 13.9598 5.76609C14.0082 5.80688 14.0442 5.8604 14.0638 5.92059C14.0834 5.98079 14.0857 6.04527 14.0706 6.10672C14.0554 6.16818 14.0234 6.22417 13.978 6.26837L11.587 8.59669C11.4293 8.75035 11.3113 8.94003 11.2432 9.14941C11.1751 9.35878 11.1589 9.58157 11.196 9.79861L11.7604 13.0882C11.7715 13.1508 11.7647 13.2153 11.7409 13.2742C11.7171 13.3332 11.6772 13.3843 11.6258 13.4216C11.5743 13.459 11.5134 13.4812 11.45 13.4856C11.3865 13.49 11.3231 13.4765 11.267 13.4466L8.31149 11.8927C8.11675 11.7904 7.90008 11.737 7.68013 11.737C7.46017 11.737 7.24351 11.7904 7.04877 11.8927L4.09389 13.4466C4.03778 13.4763 3.97446 13.4897 3.91114 13.4852C3.84781 13.4807 3.78702 13.4585 3.73568 13.4211C3.68433 13.3838 3.6445 13.3328 3.62071 13.2739C3.59692 13.2151 3.59012 13.1507 3.60109 13.0882L4.16493 9.79925C4.20217 9.58211 4.18604 9.35918 4.11791 9.14968C4.04979 8.94017 3.93172 8.75038 3.77389 8.59669L1.38285 6.26901C1.33715 6.22487 1.30476 6.16878 1.28938 6.10713C1.274 6.04549 1.27625 5.98076 1.29586 5.92033C1.31547 5.85989 1.35166 5.80618 1.40031 5.76531C1.44895 5.72445 1.5081 5.69806 1.57101 5.68917L4.87661 5.20597C5.09437 5.17428 5.30118 5.09016 5.47922 4.96084C5.65727 4.83151 5.80122 4.66086 5.89869 4.46357L7.37645 1.46901Z"
                                        stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Me interesa
                            </button>
                            <a class="botonAmarilloTiny" id="${evento._id}" href="paginaEvento.html?id=${evento._id}"></a>
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
    }
    tiposDeEventosDropDown.innerHTML = '';
    categorias.forEach(categoria => {
      tiposDeEventosDropDown.innerHTML += `
                <div data-categoria="conciertos">
                    <p>${categoria}</p>
                </div>
        `;
    });
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

/* Usuarios */

const inpUsuario = document.querySelector("#inpUsuario");
const inpContraseña = document.querySelector("#inpContraseña");
const btnIniciarSesion = document.querySelector(".btnIniciarSesion")
const btnRegistrar = document.querySelector("#btnRegistrar");
const perfilHeader = document.querySelector("#perfilHeader");
const modalIS = document.querySelector("#seccionIniciarSesion")

btnIniciarSesion.addEventListener('click', () => {
  modalIS.style.display = 'block';
})

/* Registrar Usuario */

btnRegistrar.addEventListener('click', async () => {
  try {
    const nuevoUsuario = {
      nombreUsuario: inpUsuario.value.trim(),
      contraseñaUsuario: inpContraseña.value.trim()
    };

    if (!nuevoUsuario.nombreUsuario || !nuevoUsuario.contraseñaUsuario) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const response = await fetch("http://localhost:3000/crearUsuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

    if (response.ok) {
      alert("Usuario creado con éxito ✅");
      inpUsuario.value = "";
      inpContraseña.value = "";
      modalIS.style.display = 'none';
      perfilHeader.style.display = 'block';
    } else {
      const errorText = await response.text();
      alert("Error al crear usuario: " + errorText);
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al crear el usuario.");
  }
});

/* Ingresar Usuario */

const btnIngresar = document.querySelector("#btnIngresar");

const usuarioLogueadoId = localStorage.getItem("usuarioLogueadoId");
if (usuarioLogueadoId) {
  perfilHeader.style.display = 'block';
  btnIniciarSesion.style.display = 'none';
  modalIS.style.display = 'none';
}

btnIngresar.addEventListener('click', async () => {
  const usuarioIngresado = inpUsuario.value.trim();
  const contraseñaIngresada = inpContraseña.value.trim();

  if (!usuarioIngresado || !contraseñaIngresada) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/usuarios");
    const usuarios = await response.json();

    const usuarioValido = usuarios.find(
      u => u.nombreUsuario === usuarioIngresado && u.contraseñaUsuario === contraseñaIngresada
    );

    if (usuarioValido) {
      alert("Ingreso exitoso");
      inpUsuario.value = "";
      inpContraseña.value = "";
      modalIS.style.display = 'none';
      perfilHeader.style.display = 'block';      

      localStorage.setItem("usuarioLogueadoId", usuarioValido._id);
      localStorage.setItem("usuarioLogueadoNombre", usuarioValido.nombreUsuario);

      console.log(localStorage.getItem("usuarioLogueadoId"));
      console.log("Usuario logueado ID:", usuarioValido.nombreUsuario);
      nombreUsuarioHeader.textContent = localStorage.getItem("usuarioLogueadoNombre");
      console.log(usuarioValido)
    } else {
      alert("Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al intentar iniciar sesión.");
  }
});

cargarNombreUsuario();
function cargarNombreUsuario() {
  nombreUsuarioHeader.textContent = localStorage.getItem("usuarioLogueadoNombre");
}
  console.log(usuarioLogueadoId)
  
