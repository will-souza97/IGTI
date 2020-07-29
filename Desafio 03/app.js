const cities = require("./dados/Cidades.json");
const states = require("./dados/Estados.json");

const { promises } = require("fs");

async function searchStates() {
  try {
    const totalCities = [];
    const cityNameSize = [];

    // Percorrer array de Estados
    for (let state of states) {
      const dados = [];

      // Percorrer array de Cidades
      for (let city of cities) {
        if (city.Estado === state.ID) {
          dados.push(city);
          cityNameSize.push(city.Nome);
        }
      }

      cityNameSize.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
      cityNameSize.sort((a, b) => b.length - a.length);

      const UF = state.Sigla;
      const Cities = dados.length;

      totalCities.push({ UF, Cities });
      
      totalCities.sort((a, b) => b.Cities - a.Cities);

      await promises.writeFile(
        `./dados/cityNameSize.json`,
        JSON.stringify(cityNameSize)
      );

      // Criar JSON com cada UF e o total de Cidades de cada uma
      await promises.writeFile(
        `./dados/totalCities.json`,
        JSON.stringify(totalCities)
      );
      
      dados.sort((a, b) => a.Nome.length - b.Nome.length);
      // Criar JSON com cada UF e preenche-las com as suas respectivas cidades
      await promises.writeFile(
        `./UF/${state.Sigla}.json`,
        JSON.stringify(dados)
      );
    }
  } catch (err) {
    console.log(err);
  }
}

searchStates();

async function totalCities(uf) {
  const state = JSON.parse(await promises.readFile(`./UF/${uf}.json`));
  console.log(`Estado de ${uf} possue ${state.length} Cidades.`);
}
totalCities("MG");

async function topFiveStates() {
  const states = JSON.parse(
    await promises.readFile(`./dados/totalCities.json`)
  );
  const topFiveStatesBigger = await states
    .slice(0, 5)
    .map((item) => `${item.UF}: ${item.Cities}`);
  const topFiveStatesLower = await states
    .slice(-5)
    .map((item) => `${item.UF}: ${item.Cities}`);

  console.log(topFiveStatesBigger);
  console.log(topFiveStatesLower);
}
topFiveStates();

// async function NameSize() {
//   const names = JSON.parse(
//     await promises.readFile(`./dados/cityNameSize.json`)
//   );
//   console.log(names);

//   let bigger = 0;
//   let lower = 0;
//   // names.filter(item => console.log(item))
// }
// NameSize();
