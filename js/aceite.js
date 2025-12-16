const name = localStorage.getItem("playerName");

document.getElementById("title").textContent = name
    ? `${name}, este é o último aviso`
    : "Este é o último aviso";

function acceptJourney() {
    localStorage.setItem("acceptedJourney", "true");
    window.location.href = "pag3.html";
}

function declineJourney() {
    localStorage.removeItem("acceptedJourney");
    alert("Alguns caminhos exigem coragem, mas pelo visto você não tem o que o caminho necessita.");
    window.location.href = "index.html";
}
