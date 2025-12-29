const allowedUsers = [
    "shod",
    "lunna",
    "bradesco",
    "pedroca",
    "banana",
    "ren"
];

const REN_PASSWORD = "129148";

function saveName() {
    const input = document.getElementById("playerName").value.trim().toLowerCase();

    if (input === "") {
        alert("Digite um nome para continuar.");
        return;
    }

    if (!allowedUsers.includes(input)) {
        alert("Este nome não está cadastrado no sistema, favor tentar novamente.");
        return;
    }

    if (input === "ren") {
        const password = prompt("Informe a senha:");

        if (password !== REN_PASSWORD) {
            alert("Senha incorreta.");
            return;
        }

        localStorage.setItem("playerName", "Ren");
        window.location.href = "../c._._/htmlregras/pag4.html";
        return;
    }

    const formattedName = input.charAt(0).toUpperCase() + input.slice(1);
    localStorage.setItem("playerName", formattedName);
    window.location.href = "../c._._/html/pag2.html";
}
