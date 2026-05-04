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