const URLbase = "https://que-hay-5i96.onrender.com";
const modalIniciarSesion = document.querySelector("#modalIniciarSesion");
const header = document.querySelector("header");
headerLoad();
cargarModalIniciarSesion();
const inpContraseña = document.querySelector("#inpContraseña");
const btnIniciarSesion = document.querySelector("#btnIniciarSesion")
const btnRegistrar = document.querySelector("#btnRegistrar");
const perfilHeader = document.querySelector("#perfilHeader");
const modalIS = document.querySelector("#seccionIniciarSesion")
const nombreUsuarioHeader = document.querySelector("#nombreUsuarioHeader");
cargarNombreUsuario();
function cargarNombreUsuario() {
  nombreUsuarioHeader.textContent = localStorage.getItem("usuarioLogueadoNombre");
}

function headerLoad (){
    header.innerHTML = `        <div class="contenedor">
            <a href="index.html"><img src="img/logo.png" alt="volver a inicio" id="logoHeader"></a>
            <nav>
                <a href="index.html" id="inicioHeader" class="botonBlanco">Inicio</a>
                <a href="crearEvento.html" id="crearEventoHeader" class="botonBlanco">Crear evento</a>
                <a href="perfil.html" id="perfilHeader" class="botonBlanco">Perfil</a>
                <button id="btnIniciarSesion" class="botonBlanco">Iniciar sesión</button>
                <button id="btnCerrarSesion" class="botonBlanco">Cerrar Sesion</button>
                <h2 id="nombreUsuarioHeader">nombre usuario</h2>
            </nav>
        </div>`;
}

let sesionIniciada = false;
verificarSesion();
function verificarSesion() {
    if (localStorage.getItem("usuarioLogueadoId")) {
        sesionIniciada = true;
        document.querySelector("#btnIniciarSesion").style.display = "none";
        document.querySelector("#perfilHeader").style.display = "block";
        document.querySelector("#btnCerrarSesion").style.display = "block";
    } else {
        sesionIniciada = false;
        document.querySelector("#btnIniciarSesion").style.display = "block";
        document.querySelector("#perfilHeader").style.display = "none";
        document.querySelector("#btnCerrarSesion").style.display = "none";
    }};

    const btnCerrarSesion = document.querySelector("#btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogueadoId");
        localStorage.removeItem("usuarioLogueadoNombre");
        window.location.href = "index.html";
        verificarSesion();});

        const inpUsuario = document.querySelector("#inpUsuario");


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

    const response = await fetch(`${URLbase}/crearUsuario`, {
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
    const response = await fetch(`${URLbase}/usuarios`);
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
      verificarSesion();
    } else {
      alert("Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al intentar iniciar sesión.");
  }
});

const btnCerrarModalIS = document.querySelector("#btnCerrarModalIS");
btnCerrarModalIS.addEventListener("click", () => {
    modalIS.style.display = "none";
});

function cargarModalIniciarSesion() {
    console.log("Cargando modal iniciar sesion");
    modalIniciarSesion.innerHTML = `   

            <button id="btnCerrarModalIS" class="botonBlanco"><svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.1667 24.1667L1.5 1.5M24.1667 1.5L1.5 24.1667" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg></button>
    <div id="infoModalIniciarSesion">
            <h1>Iniciar<br>sesión</h1>
            <p>Ingresa con usuario y contraseña.</p>
            <div class="labelYInput">
                <label for="inpUsuario">Usuario</label>
                <input type="text" placeholder="Usuario" class="input" id="inpUsuario">
            </div>
            <div class="labelYInput">
                <label for="inpContraseña">Contraseña</label>
                <input type="password" placeholder="Contraseña" class="input" id="inpContraseña">
            </div>

            <div>
                <button id="btnRegistrar" class="botonBlancoTiny">Registrar</button>
                <button id="btnIngresar" class="botonBlancoTiny">Ingresar</button>
            </div>`;
}

