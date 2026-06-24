

const menu = [

  { nombre: 'Gallo Pinto', descripcion: 'Arroz con frijoles y especias tradicionales', precio: 2500, categoria: 'Entrada' },
  { nombre: 'Chifrijo', descripcion: 'Arroz, frijoles, chicharrón y pico de gallo', precio: 4500, categoria: 'Entrada' },
  { nombre: 'Casado Tico', descripcion: 'Arroz, frijoles, carne, ensalada y plátano maduro', precio: 6000, categoria: 'Plato Fuerte' },
  { nombre: 'Olla de Carne', descripcion: 'Sopa tradicional con verduras y carne de res', precio: 5500, categoria: 'Plato Fuerte' },
  { nombre: 'Arroz con Pollo', descripcion: 'Arroz sazonado con pollo y vegetales', precio: 5200, categoria: 'Plato Fuerte' },
  { nombre: 'Tres Leches', descripcion: 'Postre suave y dulce tradicional latinoamericano', precio: 3000, categoria: 'Postre' },
  { nombre: 'Arroz con Leche', descripcion: 'Postre cremoso con canela y leche', precio: 2000, categoria: 'Postre' }
];

let categoriaActual = "Todos";


// RENDER MENU 


function renderMenu() {

    const contenedor = document.getElementById("menuContainer");
    contenedor.innerHTML = "";

    let lista = menu;

    if (categoriaActual !== "Todos") {
        lista = menu.filter(item => item.categoria === categoriaActual);
    }

    lista.forEach(plato => {

        const card = document.createElement("div");
        card.classList.add("card-plato");

        const img = document.createElement("img");
        img.alt = plato.nombre;

        const content = document.createElement("div");
        content.classList.add("card-content");

        const nombre = document.createElement("h3");
        nombre.textContent = plato.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = plato.descripcion;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = "₡" + plato.precio.toLocaleString("es-CR");

        const categoria = document.createElement("small");
        categoria.textContent = plato.categoria;

        content.appendChild(nombre);
        content.appendChild(descripcion);
        content.appendChild(precio);
        content.appendChild(categoria);

        card.appendChild(img);
        card.appendChild(content);

        contenedor.appendChild(card);
    });
}


// FILTRAR CATEGORÍA 


function filtrarCategoria(categoria) {

    categoriaActual = categoria;

    const botones = document.querySelectorAll(".botones button");

    botones.forEach(btn => btn.classList.remove("activo"));

    event.target.classList.add("activo");

    renderMenu();
}


// INICIALIZACIÓN


document.addEventListener("DOMContentLoaded", () => {

    renderMenu();
});


// RESERVAS


let reservas = [];


// VALIDAR FORMULARIO


function validarFormulario() {

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const personas = document.getElementById("personas").value;

    let valido = true;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Nombre
    if (nombre.length < 5 || !regexNombre.test(nombre)) {
        document.getElementById("errorNombre").textContent = "Nombre inválido";
        valido = false;
    } else {
        document.getElementById("errorNombre").textContent = "";
    }

    // Correo
    if (!regexCorreo.test(correo)) {
        document.getElementById("errorCorreo").textContent = "Correo inválido";
        valido = false;
    } else {
        document.getElementById("errorCorreo").textContent = "";
    }

    // Fecha (no pasada)
    const hoy = new Date().toISOString().split("T")[0];

    if (!fecha || fecha < hoy) {
        document.getElementById("errorFecha").textContent = "Fecha inválida";
        valido = false;
    } else {
        document.getElementById("errorFecha").textContent = "";
    }

    // Personas
    if (personas < 1 || personas > 20 || personas === "") {
        document.getElementById("errorPersonas").textContent = "Número inválido";
        valido = false;
    } else {
        document.getElementById("errorPersonas").textContent = "";
    }

    document.getElementById("btnEnviar").disabled = !valido;

    return valido;
}


// AGREGAR RESERVA

function agregarReserva(event) {

    event.preventDefault();

    if (!validarFormulario()) return;

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = document.getElementById("personas").value;

    const reserva = {
        nombre,
        correo,
        fecha,
        hora,
        personas
    };

    reservas.push(reserva);

    const fila = document.createElement("tr");
    fila.classList.add("fila-reserva");

    if (Number(personas) >= 6) {
        fila.classList.add("destacada");
    }

    const td1 = document.createElement("td");
    td1.textContent = nombre;

    const td2 = document.createElement("td");
    td2.textContent = correo;

    const td3 = document.createElement("td");
    td3.textContent = fecha;

    const td4 = document.createElement("td");
    td4.textContent = hora;

    const td5 = document.createElement("td");
    td5.textContent = personas;

    fila.appendChild(td1);
    fila.appendChild(td2);
    fila.appendChild(td3);
    fila.appendChild(td4);
    fila.appendChild(td5);

    document.getElementById("tablaReservas").appendChild(fila);

    document.getElementById("formReserva").reset();
    document.getElementById("btnEnviar").disabled = true;

    actualizarResumen();
}


// ACTUALIZAR RESUMEN


function actualizarResumen() {

    let totalReservas = reservas.length;
    let totalPersonas = 0;
    let mayorReserva = 0;

    reservas.forEach(r => {

        totalPersonas += Number(r.personas);

        if (Number(r.personas) > mayorReserva) {
            mayorReserva = Number(r.personas);
        }
    });

    document.getElementById("totalReservas").textContent = totalReservas;
    document.getElementById("totalPersonas").textContent = totalPersonas;
    document.getElementById("mayorReserva").textContent = mayorReserva;
}


// EVENTOS

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formReserva");

    form.addEventListener("submit", agregarReserva);
    form.addEventListener("input", validarFormulario);
});