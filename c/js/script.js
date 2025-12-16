
const SECRET_PASSWORD = "equilibrio";

function checkPassword() {
    
    const userInput = document.getElementById("passwordInput").value.trim().toLowerCase();
    const feedbackArea = document.getElementById("feedbackArea");

    if (userInput === SECRET_PASSWORD) {
        feedbackArea.textContent = "CORRETO! Você agora faz parte, bem-vindo...(aguarde 3 segundos) ";
        feedbackArea.className = "correct";

        setTimeout(function() {
            window.location.href = "../html/aceite.html"; 
        }, 3000);
    } else {
        feedbackArea.textContent = "VOCÊ ERROU. A palavra chave não está certa. Tente novamente, ou se não é capaz desista.";
        feedbackArea.className = "wrong";
    }
}
