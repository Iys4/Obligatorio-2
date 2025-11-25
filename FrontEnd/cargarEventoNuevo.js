const params = new URLSearchParams(window.location.search);
    const idEvento = params.get("id");
    // 2. Buscar el evento en la lista global

const eventosGlobal = await obtenerEventos();
console.log(eventosGlobal);
async function obtenerEventos() {
  const response = await fetch('http://localhost:3000/eventos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}


    const evento = eventosGlobal.find(ev => ev._id == idEvento);


    // 3. Insertar la info en la página
    document.getElementById("imagenEventoEspecifico").src = evento.linksImagenes?.[0] || "";
    document.getElementById("tituloEvEsp").textContent = evento.nombreEvento;
    document.getElementById("fechaEvEsp").textContent = new Date(evento.fecha).toLocaleDateString("es-UY");
    document.getElementById("ubiEvEsp").textContent = evento.location;
    document.getElementById("creadorEvEsp").textContent = evento.creadorEvento[0] || "Organizador desconocido";
    document.getElementById("precioEvEsp").textContent = evento.precio + " UYU";

    // 4. Detalles
    document.getElementById("mayoresEvEsp").textContent = evento.mayores ? "+18" : "Apta todo público";
    document.getElementById("presencialEvEsp").textContent = evento.presencial ? "Presencial" : "Online";
    document.getElementById("lluviaEvEsp").textContent = evento.lluvia ? "No se suspende por lluvia" : "Puede suspenderse";
    document.getElementById("descripcionEvEsp").textContent = evento.descripcion || "Sin descripción";

    // 5. Galería dinámica
    const contenedorGaleria = document.getElementById("contenedorImagenesEvEsp");
    contenedorGaleria.innerHTML = "";

    if (evento.linksImagenes?.length > 1) {
        evento.linksImagenes.slice(1).forEach(img => {
            const imagen = document.createElement("img");
            imagen.src = img;
            imagen.alt = "Imagen del evento";
            contenedorGaleria.appendChild(imagen);
        });
    } else {
        contenedorGaleria.innerHTML = "<p>No hay imágenes adicionales.</p>";
    }


//MEGACHATGPT

// --- Button declarations (must be at top to use in functions) ---
const btnEditar = document.querySelector("#editarDatos");
const btnEliminar = document.querySelector("#btnEliminarEvento");
let enEdicion = false;

// --- Authentication check ---
function verificarAutenticacion() {
    const usuarioLogueado = localStorage.getItem("usuarioLogueadoNombre");
    console.log("Usuario logueado:", usuarioLogueado);
    const creadorEvento = evento.creadorEvento[0] || evento.creador || "";
    console.log("Creador del evento:", creadorEvento);
    // Se fija si el creador es el mismo que el logeado o admin
    const esCreador = usuarioLogueado && usuarioLogueado === creadorEvento || usuarioLogueado === "Admin";
    console.log("Es creador o admin:", esCreador);
    
    // Enable/disable edit and delete buttons
    if (esCreador) {
        btnEditar.style.display = "block";
        btnEliminar.style.display = "block";
    } else {
        btnEditar.style.display = "none";
        btnEliminar.style.display = "none";
    }
    
    return esCreador;
}

// --- Edit / Confirm flow ---

function toggleVisibility(idToShow, idToHide) {
    const elShow = document.getElementById(idToShow);
    const elHide = document.getElementById(idToHide);
    if (elShow) elShow.hidden = false;
    if (elHide) elHide.hidden = true;
}
//carga los datos al input
function prefillInputs(evento) {
    const nameIn = document.querySelector("#editNombreEvento");
    const dateIn = document.querySelector("#editFechaEvento");
    const ubiIn = document.querySelector("#editUbiEvento");
    const precioIn = document.querySelector("#edirPrecioEvento");
    const mayoresSel = document.querySelector("#eventoEditarMayores");
    const presencialSel = document.querySelector("#eventoEditarPresencial");
    const lluviaSel = document.querySelector("#eventoEditarLluvia");
    const descIn = document.querySelector("#eventoEditarDescripcion");

    if (nameIn) nameIn.value = evento.nombreEvento || "";
    //Agarra la date desde ISO y la convierte en un String
    if (dateIn) {
        try {
            dateIn.value = new Date(evento.fecha).toISOString().slice(0, 10);
        } catch (e) {
            dateIn.value = evento.fecha || "";
        }
    }
    //carga todo el resto de los datos desde el string
    if (ubiIn) ubiIn.value = evento.location || "";
    if (precioIn) precioIn.value = evento.precio ?? "";
    if (mayoresSel) mayoresSel.value = evento.mayores ? "si" : "no";
    if (presencialSel) presencialSel.value = evento.presencial ? "si" : "no";
    if (lluviaSel) lluviaSel.value = evento.lluvia ? "si" : "no";
    if (descIn) descIn.value = evento.descripcion || "";
}
//Esto esta hecho con gpt porque es un garron hacer todo a mano, le dice qué ocultar
function showInputsForEditing() {
    // Hide display elements and show inputs
    document.getElementById("tituloEvEsp").hidden = true;
    document.getElementById("fechaEvEsp").hidden = true;
    document.getElementById("ubiEvEsp").hidden = true;
    document.getElementById("precioEvEsp").hidden = true;
    document.getElementById("mayoresEvEsp").hidden = true;
    document.getElementById("presencialEvEsp").hidden = true;
    document.getElementById("lluviaEvEsp").hidden = true;
    document.getElementById("descripcionEvEsp").hidden = true;

    document.getElementById("editNombreEvento").hidden = false;
    document.getElementById("editFechaEvento").hidden = false;
    document.getElementById("editUbiEvento").hidden = false;
    document.getElementById("edirPrecioEvento").hidden = false;
    document.getElementById("eventoEditarMayores").hidden = false;
    document.getElementById("eventoEditarPresencial").hidden = false;
    document.getElementById("eventoEditarLluvia").hidden = false;
    document.getElementById("eventoEditarDescripcion").hidden = false;
}

function hideInputsAfterEditing(updatedEvento) {
    // Update display values
    document.getElementById("tituloEvEsp").textContent = updatedEvento.nombreEvento || "Evento";
    document.getElementById("fechaEvEsp").textContent = new Date(updatedEvento.fecha).toLocaleDateString("es-UY");
    document.getElementById("ubiEvEsp").textContent = updatedEvento.location || "";
    document.getElementById("precioEvEsp").textContent = (updatedEvento.precio ?? "") + " UYU";
    document.getElementById("mayoresEvEsp").textContent = updatedEvento.mayores ? "+18" : "Apta todo público";
    document.getElementById("presencialEvEsp").textContent = updatedEvento.presencial ? "Presencial" : "Online";
    document.getElementById("lluviaEvEsp").textContent = updatedEvento.lluvia ? "No se suspende por lluvia" : "Puede suspenderse";
    document.getElementById("descripcionEvEsp").textContent = updatedEvento.descripcion || "Sin descripción";

    // Show display elements
    document.getElementById("tituloEvEsp").hidden = false;
    document.getElementById("fechaEvEsp").hidden = false;
    document.getElementById("ubiEvEsp").hidden = false;
    document.getElementById("precioEvEsp").hidden = false;
    document.getElementById("mayoresEvEsp").hidden = false;
    document.getElementById("presencialEvEsp").hidden = false;
    document.getElementById("lluviaEvEsp").hidden = false;
    document.getElementById("descripcionEvEsp").hidden = false;

    // Hide inputs
    document.getElementById("editNombreEvento").hidden = true;
    document.getElementById("editFechaEvento").hidden = true;
    document.getElementById("editUbiEvento").hidden = true;
    document.getElementById("edirPrecioEvento").hidden = true;
    document.getElementById("eventoEditarMayores").hidden = true;
    document.getElementById("eventoEditarPresencial").hidden = true;
    document.getElementById("eventoEditarLluvia").hidden = true;
    document.getElementById("eventoEditarDescripcion").hidden = true;
}

async function enviarPutConCambios(idEvento, originalEvento) {
    const nameIn = document.getElementById("editNombreEvento").value;
    const dateIn = document.getElementById("editFechaEvento").value;
    const ubiIn = document.getElementById("editUbiEvento").value;
    const precioIn = document.getElementById("edirPrecioEvento").value;
    const mayoresSel = document.getElementById("eventoEditarMayores").value;
    const presencialSel = document.getElementById("eventoEditarPresencial").value;
    const lluviaSel = document.getElementById("eventoEditarLluvia").value;
    const descIn = document.getElementById("eventoEditarDescripcion").value;

    // Armamos el body que se va a enviar al put, envia el valor del input si hay, sino el original
    const body = {
        creadorEvento: originalEvento.creadorEvento || originalEvento.creador || "Organizador desconocido",
        nombreEvento: nameIn || originalEvento.nombreEvento || "",
        linksImagenes: originalEvento.linksImagenes || [],
        fecha: dateIn ? new Date(dateIn).toISOString() : (originalEvento.fecha || new Date().toISOString()),
        descripcion: descIn || originalEvento.descripcion || "",
        precio: precioIn !== undefined && precioIn !== null && precioIn !== "" ? Number(precioIn) : (originalEvento.precio ?? 0),
        location: ubiIn || originalEvento.location || "",
        categoria: originalEvento.categoria || "",
        // Additional flags (attempt to preserve semantics)
        menoresDeEdad: (typeof originalEvento.menoresDeEdad !== 'undefined') ? originalEvento.menoresDeEdad : !(originalEvento.mayores ?? false),
        techado: lluviaSel === 'si' ? true : (originalEvento.techado ?? false),
        presencial: presencialSel === 'si' ? true : (originalEvento.presencial ?? false),
        // keep a copy of the original 'mayores' flag if present
        mayores: mayoresSel === 'si' ? true : false
    };

    const resp = await fetch(`http://localhost:3000/eventos/${idEvento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Error actualizando evento: ${resp.status} ${text}`);
    }

    
    const updated = Object.assign({}, originalEvento, {
        nombreEvento: body.nombreEvento,
        fecha: body.fecha,
        descripcion: body.descripcion,
        precio: body.precio,
        location: body.location,
        categoria: body.categoria,
        menoresDeEdad: body.menoresDeEdad,
        techado: body.techado,
        presencial: body.presencial,
        mayores: body.mayores
    });

    return updated;
}

//Programacion para el boton de edicion
if (btnEditar) {
    btnEditar.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!enEdicion) {
            // enter edit mode
            prefillInputs(evento);
            showInputsForEditing();
            btnEditar.textContent = 'Confirmar cambios';
            btnEditar.style.backgroundColor = '#ffff3aff';
            enEdicion = true;
            return;
        }

        // already in edit mode -> confirm and send PUT
        btnEditar.disabled = true;
        btnEditar.textContent = 'Guardando...';
        try {
            const actualizado = await enviarPutConCambios(idEvento, evento);
            // reflect updated values locally and in the UI
            Object.assign(evento, actualizado);
            hideInputsAfterEditing(actualizado);
            btnEditar.textContent = 'Editar Datos';
            enEdicion = false;
        } catch (err) {
            console.error(err);
            alert('No se pudo actualizar el evento. Revisa la consola para más detalles.');
            btnEditar.textContent = 'Confirmar cambios';
            enEdicion = true;
        } finally {
            btnEditar.disabled = false;
        }
    });
}

// --- Delete event handler ---
async function eliminarEvento(idEvento) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    try {
        const resp = await fetch(`http://localhost:3000/eventos/${idEvento}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!resp.ok) {
            const text = await resp.text();
            throw new Error(`Error eliminando evento: ${resp.status} ${text}`);
        }

        alert('Evento eliminado con éxito');
        // Redirect to home page
        window.location.href = 'index.html';
    } catch (err) {
        console.error(err);
        alert('No se pudo eliminar el evento. Revisa la consola para más detalles.');
    }
}

if (btnEliminar) {
    btnEliminar.addEventListener('click', async (e) => {
        e.preventDefault();
        await eliminarEvento(idEvento);
    });
}

// --- Call authentication check ---
verificarAutenticacion();