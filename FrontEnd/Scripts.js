const contenedorEventosMain = document.querySelector('#contenedorEventosMain');

async function listarEventos() {

  try {
    const response = await fetch(`http://localhost:3000/eventos`);
    const arrayEventos = await response.json();

    contenedorEventosMain.innerHTML = ""; // limpiar antes de renderizar

    arrayEventos.forEach(evento => {
      contenedorEventosMain.innerHTML += `
        <div class="evento">
          <img src="${evento.linkImagen[0] || ''}" alt="imagen de evento" class="imagenEventoMain">
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
            ${Array.isArray(evento.categoria) ? evento.categoria.map(tag => `<p>${tag}</p>`).join('') : `<p>${evento.categoria}</p>`}
          </div>
        </div>
      `;
    });
  }
  catch (e) {
    console.log('Error al listar los eventos');
  }
}

listarEventos();




