import express from "express";
import { promises as fs } from "fs";
import gradesRoutes from "./routes/gradesRoutes.js";
import situacaoAluno from "./routes/situacaoAluno.js";

const { readFile, writeFile } = fs;
const app = express();

app.use(express.json());

app.use("/grades", gradesRoutes);
app.use("/media", situacaoAluno);

app.listen(5500, async () => {
  try {
    await readFile("grades.json");
  } catch (error) {
    const initialJSON = {
      nextId: 1,
      grades: [],
    };
    await writeFile("grades.json", JSON.stringify(initialJSON));
  }
});
