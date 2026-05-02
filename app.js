import { codigosValidos } from './codigos.js';

const input = document.getElementById("codigo");
const resultado = document.getElementById("resultado");
const boton = document.getElementById("btnValidar");

// Validar código
function validarCodigo() {
    const codigo = parseInt(input.value.trim());

    if (!codigo || isNaN(codigo)) {
        resultado.innerHTML = "⚠️ Ingresa un número válido";
        resultado.className = "";
        return;
    }

    if (codigosValidos.has(codigo)) {
        resultado.innerHTML = `✅ ${codigo} es cliente`;
        resultado.className = "valido";
    } else {
        resultado.innerHTML = `❌ ${codigo} no es cliente`;
        resultado.className = "invalido";
    }
}

// Eventos
boton.addEventListener("click", validarCodigo);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") validarCodigo();
});

// PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
    }, 500);
});