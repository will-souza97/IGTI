const express = require("express");
const server = express();
const fs = require("fs");

const cities = require("./dados/CIdades.json");
const states = require("./dados/Estados.json");

server.use(express.json());

server.get("/searchStates", async (_, res) => {
  // Percorrer array de Estados
  for (let state of states) {
    const dados = [];

    // Percorrer array de Cidades
    for (let city of cities) {
      if (city.state === state.ID) {
        dados.push(city);
      }
    }

    // Criar JSON com cada UF e preenche-las com as suas respectivas cidades
    await fs.writeFile(
      `./UF/${state.Sigla}.json`,
      JSON.stringify(dados),
      (err) => {
        if (err) throw err;
      }
    );
  }
  res.status(200).json({ Result: "Busca Concluida" });
});

server.listen("3000");
