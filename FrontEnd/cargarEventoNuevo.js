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
    document.getElementById("creadorEvEsp").textContent = evento.creador || "Organizador desconocido";
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