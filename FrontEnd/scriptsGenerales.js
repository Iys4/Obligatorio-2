const header = document.querySelector("header");
headerLoad();
const nombreUsuarioHeader = document.querySelector("#nombreUsuarioHeader");
cargarNombreUsuario();
function cargarNombreUsuario() {
  nombreUsuarioHeader.textContent = localStorage.getItem("usuarioLogueadoNombre");
}

function headerLoad (){
    header.innerHTML = `        <div class="contenedor header">
            <a href="index.html"><img src="img/logo.png" alt="volver a inicio" id="logoHeader"></a>
            <nav>
                <a href="index.html" id="inicioHeader">Inicio</a>
                <a href="crearEvento.html" id="crearEventoHeader">Crear evento</a>
                <a href="perfil.html" id="perfilHeader">Perfil</a>
                <button class="btnIniciarSesion">Iniciar sesión</button>
                <h2 id="nombreUsuarioHeader">nombre usuario</h2>
            </nav>
        </div>`;
}