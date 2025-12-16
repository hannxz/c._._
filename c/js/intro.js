// Usuários permitidos
const allowedUsers = [
    "shod",
    "lunna",
    "bradesco",
    "powder",
    "pedroca",
    "banana",
    "ren"
];

// Senha especial do Ren
const REN_PASSWORD = "129148"; // você escolhe a senha

function saveName() {
    const input = document.getElementById("playerName").value.trim().toLowerCase();

    if (input === "") {
        alert("Digite um nome para continuar.");
        return;
    }

    if (!allowedUsers.includes(input)) {
        alert("Esse nome não ecoa neste lugar.");
        return;
    }

    // Caso especial: REN
    if (input === "ren") {
        const password = prompt("Informe a senha:");

        if (password !== REN_PASSWORD) {
            alert("Senha incorreta.");
            return;
        }

        // Salva o nome e redireciona para a página secreta
        localStorage.setItem("playerName", "Ren");
        window.location.href = "pag3.html";
        return;
    }

    // Usuários normais
    const formattedName = input.charAt(0).toUpperCase() + input.slice(1);
    localStorage.setItem("playerName", formattedName);
    window.location.href = "enigma.html"; // enigma
}
