const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors());
app.use(express.json())


//Db
const conn = require("./db/connection");
conn();

//Routers
const routes = require("./routes/router")
app.use('/Api', routes);


// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor iniciado na porta 3000');
});
