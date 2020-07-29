const express = require("express");
const server = express();
const { promises } = require("fs");

const cities = require("./dados/Cidades.json");
const states = require("./dados/Estados.json");

server.use(express.json());

server.get("/searchStates", async (_, res) => {
  try {
    // Percorrer array de Estados
    for (let state of states) {
      const dados = [];

      // Percorrer array de Cidades
      for (let city of cities) {
        if (city.Estado === state.ID) {
          dados.push(city);
        }
      }

      // Criar JSON com cada UF e preenche-las com as suas respectivas cidades
      await promises.writeFile(
        `./UF/${state.Sigla}.json`,
        JSON.stringify(dados)
      );
    }
    res.status(200).json({ Result: "Busca Concluida" });
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

server.listen("3000");
