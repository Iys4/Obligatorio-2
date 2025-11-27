// crearEvento.js
const URLbase = "https://que-hay-5i96.onrender.com";

const botonCrearEventoCE = document.querySelector("#buttonCrearEvento");

let linksImagenes = [];
//Toma los valores de todos los inputs y los inserta con el metodo put
botonCrearEventoCE.addEventListener("click", async () => {
    console.log(linksImagenes);
    try {
      // Obtener los valores de los inputs
      const nombreEvento = document.querySelector("#nombrarEventoCE input").value;
      const descripcion = document.querySelector("#descripcionEventoCE input").value;
      const precio = Number(document.querySelector("#inputPrecio input").value);
      const location = document.querySelector("#inputUbicacion input").value;
      const fecha = document.querySelector("#inputFecha input").value;
      const categoria = document.querySelector("#selectCategoriaCE").value;
      let menoresDeEdad = true;
      let techado = false;
      let presencial = true;

      //Toma al usuario en el local storage y lo agrega
      const usuarioLogueado = localStorage.getItem("usuarioLogueadoNombre");
      const nuevoEvento = {
        creadorEvento: [usuarioLogueado],
        nombreEvento,
        linksImagenes,
        fecha,
        descripcion,
        precio,
        location,
        categoria,
        edad18,
        suspendidoLluvia,
        presencial
      };
      console.log(nuevoEvento);
      console.log("Enviando evento:", nuevoEvento);

      //Enviar el evento al backend
      const response = await fetch(`${URLbase}/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoEvento)
      });

      //Te da la respuesta y te dice que se creo
      if (response.ok) {
        const data = await response.text();
        alert("Evento creado con éxito ✅");
        window.location.href = "index.html"
        console.log("Servidor respondió:", data);
      } else {
        const errorText = await response.text();
        alert("Error al crear evento: " + errorText);
        console.error(errorText);
      }

    } catch (error) {
      console.error("Error en la creación del evento:", error);
      alert("Ocurrió un error al enviar el formulario.");
    }
  });

  const TRUE18 = document.querySelector("#TRUE18");
  const FALSE18 = document.querySelector("#FALSE18");
  let edad18 = true;

    TRUE18.addEventListener("click", () => {
        if (edad18 === false) {
            edad18 = true;}
            TRUE18.style.backgroundColor = "green";
            FALSE18.style.backgroundColor = "white";
            console.log(edad18);
    });

        FALSE18.addEventListener("click", () => {
        if (edad18 === true) {
            edad18 = false;}
            FALSE18.style.backgroundColor = "green";
            TRUE18.style.backgroundColor = "white";
    });

    // PRESENCIAL
const TRUEPresencial = document.querySelector("#TRUETechado");
const FALSEPresencial = document.querySelector("#FALSETechado");
let presencial = true;

TRUEPresencial.addEventListener("click", () => {
    if (presencial === false) {
        presencial = true;
    }
    TRUEPresencial.style.backgroundColor = "green";
    FALSEPresencial.style.backgroundColor = "white";
    console.log(presencial);
});

FALSEPresencial.addEventListener("click", () => {
    if (presencial === true) {
        presencial = false;
    }
    FALSEPresencial.style.backgroundColor = "green";
    TRUEPresencial.style.backgroundColor = "white";
    console.log(presencial);
});


// SUSPENDIDO POR LLUVIA
const TRUESuspendidoLluvia = document.querySelector("#TRUESuspendidoLluvia");
const FALSESuspendidoLluvia = document.querySelector("#FALSESuspendidoLluvia");
let suspendidoLluvia = true;

TRUESuspendidoLluvia.addEventListener("click", () => {
    if (suspendidoLluvia === false) {
        suspendidoLluvia = true;
    }
    TRUESuspendidoLluvia.style.backgroundColor = "green";
    FALSESuspendidoLluvia.style.backgroundColor = "white";
    console.log(suspendidoLluvia);
});

FALSESuspendidoLluvia.addEventListener("click", () => {
    if (suspendidoLluvia === true) {
        suspendidoLluvia = false;
    }
    FALSESuspendidoLluvia.style.backgroundColor = "green";
    TRUESuspendidoLluvia.style.backgroundColor = "white";
    console.log(suspendidoLluvia);
});

const agregarImagenCE = document.querySelector("#agregarImagenCE");
const agregarImagenButt = document.querySelector("#agregarImagenButt");
const contenedorDeImagenesCE = document.querySelector("#contenedorDeImagenesCE");
const inputLinkImagen0 = document.querySelector("#inputLinkImagen0");
let contadorDeImagenesCE = 1;

agregarImagenButt.addEventListener("click", () => {
  const URLimagen = inputLinkImagen0.value.trim();

  if (!URLimagen) {
    alert("Por favor ingresa una URL de imagen");
    return;
  }

  contenedorDeImagenesCE.innerHTML += `
    <div id="imagenAgregarCE${contadorDeImagenesCE}" class="contenedorImagenCE">
      <img src="${URLimagen}" alt="Imagen ${contadorDeImagenesCE}">
    </div>
  `;
  linksImagenes.push(URLimagen);
  console.log(linksImagenes);
  contadorDeImagenesCE++;
  inputLinkImagen0.value = ""; // limpia el input
});

