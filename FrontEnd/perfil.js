const infoPerfil = document.querySelector('#imagenYDatosPerfil');
const id = localStorage.getItem("usuarioLogueadoId");

async function mostrarInfoPerfil() {
  if (!id) return;

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el usuario");
    const usuario = await response.json();

    infoPerfil.innerHTML = `
      <div id="imagenPerfil"></div>

      <div id="nombreYDatosPerfil">
        <h2 class="campoPerfil">${usuario.nombreUsuario || "Usuario"}</h2>

        <h3>Información</h3>

        <div>
          <h4>Sobre mí</h4>
          <p class="campoPerfil">${usuario.descripcionUsuario || "Sin descripción"}</p>
        </div>

        <div>
          <h4>Ubicación</h4>
          <p class="campoPerfil">${usuario.ubicacionUsuario || "No especificada"}</p>
        </div>

        <div>
          <h4>Intereses</h4>
          <p class="campoPerfil">${usuario.interesesUsuario || "Ninguno"}</p>
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

/* Editar Info Perfil */

const btnEditar = document.querySelector('#btnEditar')
btnEditar.addEventListener('click', hacerPerfilEditable)

function hacerPerfilEditable() {
  const camposPerfil = document.querySelectorAll(".campoPerfil");

  camposPerfil.forEach(p => {
    const valor = p.textContent.trim() || "";

    const input = document.createElement("input");
    input.type = "text";
    input.value = valor;
    input.className = "inputPerfil";

    p.replaceWith(input);
  });
}

/* Guardar Info Perfil */

const btnGuardar = document.querySelector('#btnGuardar')
btnGuardar.addEventListener('click', guardarInfoPerfil)

async function guardarInfoPerfil(){
  const inputsPerfil = document.querySelectorAll(".inputPerfil");

  inputsPerfil.forEach(input => {
    const valor = input.value.trim() || "";
    const p = document.createElement("p");
    p.className = "campoPerfil";
    p.textContent = valor;
    input.replaceWith(p);
  });

  const nombreUsuario = inputsPerfil[0].value.trim();
  const descripcionUsuario = inputsPerfil[1].value.trim();
  const ubicacionUsuario = inputsPerfil[2].value.trim();
  const interesesUsuario = inputsPerfil[3].value.trim();
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreUsuario,
        descripcionUsuario,
        ubicacionUsuario,
        interesesUsuario
      })
    });
    if (!response.ok) throw new Error("No se pudo actualizar el perfil");
    alert("Perfil actualizado con éxito");
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    alert("Ocurrió un error al actualizar el perfil.");
  }    

}
