// Elementos del DOM
const input = document.getElementById("codigo");
const resultado = document.getElementById("resultado");
const boton = document.getElementById("btnValidar");
const totalClientes = document.getElementById("totalClientes");

// Set vacío (se llenará desde JSON)
let codigosValidos = new Set();

// 🔥 CARGAR CÓDIGOS DESDE codigos.json
fetch('./codigos.json')
    .then(response => response.json())
    .then(data => {
        codigosValidos = new Set(data);
        totalClientes.textContent = codigosValidos.size;
    })
    .catch(error => {
        console.error("Error cargando códigos:", error);
        resultado.innerHTML = "⚠️ Error cargando base de datos";
        resultado.className = "invalido";
    });

// Función para mostrar mensajes
function mostrarResultado(mensaje, tipo) {
    resultado.innerHTML = mensaje;
    resultado.className = tipo;
}

// Validar código
function validarCodigo() {
    const codigoTexto = input.value.trim();

    if (codigoTexto === "") {
        mostrarResultado("⚠️ Ingresa un código", "invalido");
        return;
    }

    const codigo = Number(codigoTexto);

    if (isNaN(codigo)) {
        mostrarResultado("⚠️ Solo se permiten números", "invalido");
        return;
    }

    if (codigosValidos.has(codigo)) {
        mostrarResultado(
            `✅ El código <strong>${codigo}</strong><br>SÍ es cliente de consignación`,
            "valido"
        );
    } else {
        mostrarResultado(
            `❌ El código <strong>${codigo}</strong><br>NO es cliente de consignación`,
            "invalido"
        );
    }

    input.value = "";
    input.focus();
}

// Eventos
boton.addEventListener("click", validarCodigo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        validarCodigo();
    }
});

// PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 400);
    }
});