import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.envName));
    delete data.accumulator;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.envName));
    console.log(data);
    const account = data.accounts.find((account) => account.id);
    return res.status(200).json(account);
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.envName));

    account = { id: data.accumulator++, ...account };
    data.accounts.push(account);

    await writeFile(global.envName, JSON.stringify(data, null, 2));
    return res.status(201).json(account);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, balance } = req.body;
    const data = JSON.parse(await readFile(global.envName));
    const accountID = data.accounts.findIndex(
      (account) => req.params.id == account.id
    );
    data.accounts[accountID].name = name;
    data.accounts[accountID].balance = balance;

    await writeFile(global.envName, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.patch("/updateBalance/:id", async (req, res) => {
  try {
    const { balance } = req.body;
    const data = JSON.parse(await readFile(global.envName));
    const accountID = data.accounts.findIndex(
      (account) => req.params.id == account.id
    );
    data.accounts[accountID].balance = balance;

    await writeFile(global.envName, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Value updated successfully" });
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.envName));
    const accountID = data.accounts.findIndex(
      (account) => req.params.id == account.id
    );
    data.accounts.splice(accountID, 1);

    await writeFile(global.envName, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: "Account successfully removed" });
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

export default router;
