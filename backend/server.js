require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    assunto TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/contato", async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({
      sucesso: false,
      erro: "Preencha todos os campos."
    });
  }

  if (!emailValido(email)) {
    return res.status(400).json({
      sucesso: false,
      erro: "Digite um e-mail válido."
    });
  }

  db.run(
    `INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)`,
    [nome, email, assunto, mensagem],
    async function (erro) {
      if (erro) {
        return res.status(500).json({
          sucesso: false,
          erro: "Erro ao salvar contato."
        });
      }

      try {
        await transporter.sendMail({
          from: `"Portfólio Akaz" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          replyTo: email,
          subject: `Novo contato: ${assunto}`,
          html: `
            <h2>Nova mensagem pelo portfólio</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${assunto}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${mensagem}</p>
          `
        });

        return res.json({
          sucesso: true,
          mensagem: "Mensagem enviada com sucesso!"
        });

      } catch (erroEmail) {
    console.error("Erro ao enviar e-mail:", erroEmail);

    return res.status(500).json({
        sucesso: false,
        erro: "Contato salvo, mas houve erro ao enviar o e-mail."
    });
}
    }
  );
});

app.get("/", (req, res) => {
  res.send("Backend do portfólio rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});