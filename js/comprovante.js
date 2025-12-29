const name = localStorage.getItem("playerName") || "Viajante";

document.getElementById("msg").textContent =
    `${name} aceitou seguir adiante.`;

const now = new Date();
document.getElementById("date").textContent =
    `Registro: ${now.toLocaleString()}`;

setTimeout(() => {
    window.location.href = "../htmlregras/atributos.html";
}, 20000);
