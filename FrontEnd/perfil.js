const infoPerfil = document.querySelector('#imagenYDatosPerfil');
const id = localStorage.getItem("usuarioLogueadoId");


//Mostrar info perfil
async function mostrarInfoPerfil() {
  //Si no hay ID no te deja entrar, teoricamente esto es imposible porque el boton de perfil no se puede ver si no estas con la sesh iniciada
  if (!id) return;
  try {
    //Busca la info del usuario y la carga
    const response = await fetch(`${URLbase}/usuarios/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el usuario");
    const usuario = await response.json();
    console.log(usuario)
    //Carga dinamica todo el html de perfil con la informacion relevante
    infoPerfil.innerHTML = `
      <div>
        <div id="imagenPerfil"></div>
        <input type="text" id="inpImagenPerfil" placeholder="Pega el link de tu imagen" class="input" style="display: none;">
        <button id="btnCambiarImagen" class="botonBlanco" style="display: none;">Cambiar Imagen</button>
      </div>

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

        <button id="btnGuardar" class="botonBlanco" style="display: none;">Guardar</button>
      </div>
    `;

    const imagenPerfil = document.querySelector("#imagenPerfil");
    imagenPerfil.style.backgroundImage = `url(${usuario.imagenPerfil || "img/blankprofile.webp"})`;

    //Carga dinamicamente y agrega los listeners para los botones de guardar y editar perfil
    const btnGuardar = document.querySelector('#btnGuardar')
    btnGuardar.addEventListener('click', guardarPerfil);
    const btnCambiarImagen = document.querySelector("#btnCambiarImagen")
    btnCambiarImagen.addEventListener("click", cambiarImagenPerfil);

  } catch (error) {
    console.error("Error cargando perfil:", error);
  }
}

mostrarInfoPerfil();

// Reemplaza los párrafos del perfil con inputs para editar. Muestra los botones para guardar, el input de la imagen y el boton de cambiar imagen.
// Crea un array de los diferentes inputs perfil, cada uno con un valor en el array distinto 

const btnEditar = document.querySelector('#btnEditar');
btnEditar.addEventListener('click', editarPerfil);

function editarPerfil() {
  const parrafo = document.querySelectorAll(".campoPerfil");

  parrafo.forEach(p => {
    const contenido = p.textContent.trim() || "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = contenido;
    input.className = "inputPerfil input";
    p.replaceWith(input);
  });

  const btnGuardar = document.querySelector('#btnGuardar');
  const inpImagenPerfil = document.querySelector('#inpImagenPerfil');
  const btnCambiarImagen = document.querySelector('#btnCambiarImagen');

  btnGuardar.style.display = 'block';
  inpImagenPerfil.style.display = 'block';
  btnCambiarImagen.style.display = 'block';
}

// Guarda la info del perfil basado en el contenido de los inputs. 
// La primera seccion cambia los inputs por un p nuevo

async function guardarPerfil() {
  const inputs = document.querySelectorAll(".inputPerfil");
  const nombreUsuario = inputs[0].value;
  const descripcionUsuario = inputs[1].value;
  const ubicacionUsuario = inputs[2].value;
  const interesesUsuario = inputs[3].value;
  //Esto toma los valores del input y los reemplaza por valores de p. Es un poco gepetosa pero la podemos explicar
  inputs.forEach(input => {
    const p = document.createElement("p");
    p.className = "campoPerfil";
    p.textContent = input.value.trim() || "";
    input.replaceWith(p);
  });

  document.querySelector('#btnGuardar').style.display = 'none';
  document.querySelector("#inpImagenPerfil").style.display = 'none';
  document.querySelector("#btnCambiarImagen").style.display = 'none';

  //Usa el metodo put para enviar la nueva informacion a la base de datos
  try {
    const response = await fetch(`${URLbase}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

/* Cambiar imagen de perfil */
//Hace lo mismo que arriba pero separado para que puedas cambiar la imagen de perfil independientemente del resto de la info
async function cambiarImagenPerfil() {
  const imagenPerfil = document.querySelector("#imagenPerfil");
  const inpImagenPerfil = document.querySelector("#inpImagenPerfil");
  const btnCambiarImagen = document.querySelector("#btnCambiarImagen");

  const url = inpImagenPerfil.value.trim();

  if (!url) {
    alert("Por favor ingresá una URL de imagen");
    return;
  }

  try {
    const response = await fetch(`${URLbase}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagenPerfil: url })
    });

    if (!response.ok) throw new Error("No se pudo actualizar la imagen");

    imagenPerfil.style.backgroundImage = `url("${url}")`;

    inpImagenPerfil.value = "";
    inpImagenPerfil.style.display = "none";
    btnCambiarImagen.style.display = "none";

    alert("Imagen actualizada");

  } catch (err) {
    console.error(err);
    alert("Error al actualizar la imagen");
  }
}


//Busca eventos creados por el usuario para mostrarlo
async function obtenerEventosUsuario() {
  try {
    const response = await fetch(`${URLbase}/eventos/usuario/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error("No se pudieron obtener los eventos");

    const eventos = await response.json();
    return eventos;
  } catch (e) {
    console.error(e);
    return [];
  }
}


async function obtenerEventos() {
  const response = await fetch(`${URLbase}/eventos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

//Muestra los eventos que creo el usuario

async function mostrarEventosUsuario(nombreUsuario) {
  console.log("mostrando eventos de " + nombreUsuario)
  try {
    const eventosUsuario = await obtenerEventos();
    console.log(eventosUsuario);
    const contenedorEventosPerfil = document.querySelector('#contenedorEventosPerfil');
    contenedorEventosPerfil.innerHTML = "";
    eventosUsuario.forEach(evento => {
      const nombreUsuarioString = evento.creadorEvento[0];
      console.log(nombreUsuarioString + nombreUsuario)
      if(evento.creadorEvento[0] == nombreUsuario){
        console.log("son iguales!")
      contenedorEventosPerfil.innerHTML += `
<div class="evento">
          <img src="${
            evento.linksImagenes[0] || ""
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
                            <a class="botonAmarilloTiny" id="${
                              evento._id
                            }" href="paginaEvento.html?id=${
        evento._id
      }">Ver evento</a>
                        </div>
        </div>

      `;
  }});


  } catch (e) {
    console.error("Error al listar los eventos:", e);
  }
}

const nombreUsuario = localStorage.getItem("usuarioLogueadoNombre");
mostrarEventosUsuario(nombreUsuario);

//Eliminar usuarios
const btnEliminarUsuario = document.querySelector('#btnEliminarUsuario');
btnEliminarUsuario.addEventListener('click', eliminarUsuario);

//Primero confirma que la persona quiere eliminar el perfil
async function eliminarUsuario() {
  if (!confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
    return;
  }
  try {
    const response = await fetch(`${URLbase}/usuarios/${id}`, {
      method: "DELETE"
    });
    //Se elimina el usuario y se elimina el usuario del localStorage
    if (!response.ok) throw new Error("No se pudo eliminar el usuario");
    alert("Cuenta eliminada con éxito");
    localStorage.removeItem("usuarioLogueadoId");
    localStorage.removeItem("usuarioLogueadoNombre");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    alert("Ocurrió un error al eliminar la cuenta.");
  }
}
