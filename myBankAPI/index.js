import express from "express";
import accountsRouter from "./routes/accounts.js ";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const app = express();

global.envName = "accounts.json";

app.use(express.json());
app.use("/account", accountsRouter);

app.listen(3001, async () => {
  try {
    await readFile(global.envName);
  } catch (error) {
    const initialJSON = {
      accumulator: 1,
      accounts: [],
    };
    await writeFile(global.envName, JSON.stringify(initialJSON));
  }
});
