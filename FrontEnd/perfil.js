const infoPerfil = document.querySelector('#imagenYDatosPerfil');

async function mostrarInfoPerfil() {
  const id = localStorage.getItem("usuarioLogueadoId");
  if (!id) return;

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el usuario");
    const usuario = await response.json();

    infoPerfil.innerHTML = `
      <div id="imagenPerfil"></div>

      <div id="nombreYDatosPerfil">
        <h2>${usuario.nombreUsuario || "Usuario"}</h2>

        <h3>Información</h3>

        <div>
          <h4>Sobre mí</h4>
          <p>${usuario.descripcionUsuario || "Sin descripción"}</p>
        </div>

        <div>
          <h4>Ubicación</h4>
          <p>${usuario.ubicacionUsuario || "No especificada"}</p>
        </div>

        <div>
          <h4>Intereses</h4>
          <p>${usuario.interesesUsuario || "Ninguno"}</p>
        </div>

        <button id="btnGuardar" class="botonBlanco" hidden>Guardar</button>
      </div>
    `;

    console.log("Usuario cargado:", usuario);
  } catch (error) {
    console.error("Error cargando perfil:", error);
  }
}
      mostrarInfoPerfil();
