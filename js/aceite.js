const name = localStorage.getItem("playerName");

document.getElementById("title").textContent = name
    ? name
    : "Viajante";

function acceptJourney() {
    localStorage.setItem("acceptedJourney", "true");
    window.location.href = "../html/comprovante.html";
}

function declineJourney() {
    localStorage.removeItem("acceptedJourney");
    alert("Alguns caminhos exigem coragem, mas pelo visto você não tem o que o caminho necessita.");
    window.location.href = "../index.html";
}
