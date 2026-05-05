<<<<<<< HEAD
document.getElementById("botao").addEventListener("click", async function () {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const status = document.getElementById("status-formulario");

    status.textContent = "";
    status.className = "";

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !assunto || !mensagem) {
        status.textContent = "Por favor, preencha todos os campos.";
        status.className = "erro";
        return;
    }

    if (!emailValido.test(email)) {
        status.textContent = "Digite um e-mail válido.";
        status.className = "erro";
        return;
    }

    status.textContent = "Enviando mensagem...";
    status.className = "carregando";

    try {
        const resposta = await fetch("http://localhost:3000/contato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, assunto, mensagem })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            status.textContent = dados.mensagem;
            status.className = "sucesso";

            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("assunto").value = "";
            document.getElementById("mensagem").value = "";
        } else {
            status.textContent = dados.erro || "Erro ao enviar mensagem.";
            status.className = "erro";
        }

    } catch (erro) {
        status.textContent = "Erro de conexão com o servidor.";
        status.className = "erro";
        console.error("Erro no frontend:", erro);
    }

    
});


// light mode / dark mode

    document.getElementById("light").addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });

    document.getElementById("dark").addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });

=======
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("botao").addEventListener("click", function() {

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var mensagem = document.getElementById("mensagem").value;
        var assunto = document.getElementById("assunto").value;

        const corpo = 
            `${mensagem}`;

        const gmailLink = 
            `https://mail.google.com/mail/?view=cm&fs=1` +
            `&to=akaz.guerra24@gmail.com` +
            `&su=${encodeURIComponent(assunto)}` +
            `&body=${encodeURIComponent(corpo)}`;

        window.open(gmailLink, "_blank");
    });


    document.getElementById("light").addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    })

    document.getElementById("dark").addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });

});
>>>>>>> b694a83e229b21da02d6266b911e28077864f6a0
