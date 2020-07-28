const express = require("express");
const server = express();
const fs = require("fs");

const city = require("./dados/Cidades.json");
const states = require("./dados/Estados.json");

server.use(express.json());

server.get("/searchStates", async (_, res) => {
  for (let estado of states) {
    const dados = [];

    for (let cidade of city) {
      if (cidade.Estado === estado.ID) {
        dados.push(cidade);
      }
    }
    await fs.writeFile(
      `./UF/${estado.Sigla}.json`,
      JSON.stringify(dados),
      (err) => {
        if (err) throw err;
      }
    );
  }
  res.status(200).json({ Result: "Busca Concluida" });
});

server.listen("3000");
