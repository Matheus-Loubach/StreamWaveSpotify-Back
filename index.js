const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// Db
const conn = require("./db/connection");
conn();

// Routers
const routes = require("./routes/router");
app.use("/Api", routes);

// Configuração para direcionar solicitações desconhecidas para o arquivo index.html
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta 3000");
});
