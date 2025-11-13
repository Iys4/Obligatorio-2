async function crearEvento() {
  const eventoData = {
    creadorEvento: "Ismael",
    nombreEvento: "Festival de Verano",
    linkImagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUA29STcIB67xg_4doZXCMAeC42xRTf1nTMQ&s",
    fecha: new Date("2024-12-15T18:30:00"),
    descripcion: "Un evento con música y comida",
    precio: 500,
    location: "Montevideo",
    categoria: "Música"
  };

  try {
    const response = await fetch('http://localhost:3000/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventoData)
    });

    if (!response.ok) {
      throw new Error('Error en el servidor: ' + response.statusText);
    }

    const result = await response.text();
    console.log('Respuesta del servidor:', result);
  } catch (error) {
    console.error('Error al enviar el evento:', error);
  }
}

// Ejecutarlo, por ejemplo, al apretar un botón:
document.getElementById("boton-crear").addEventListener("click", crearEvento);