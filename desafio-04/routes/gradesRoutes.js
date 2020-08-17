import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const grade = data.grades.find((grade) => req.params.id == grade.id);

    return res.status(201).json(grade);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile("grades.json"));
    const timestamp = new Date();

    grade = { id: data.nextId++, ...grade, timestamp };
    data.grades.push(grade);

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    return res.status(201).json(grade);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { student, subject, type, value } = req.body;
    const data = JSON.parse(await readFile("grades.json"));
    const id = data.grades.findIndex((grades) => req.params.id == grades.id);

    if (id === -1) {
      return res.status(400).json({ Error: "Not Found" });
    }

    data.grades[id].student = student;
    data.grades[id].subject = subject;
    data.grades[id].type = type;
    data.grades[id].value = value;

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Grade updated successfully" });
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const id = data.grades.findIndex((grade) => req.params.id == grade.id);

    if (id === -1) {
      return res.status(400).json({ Error: "Not Found" });
    }

    data.grades.splice(id, 1);

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Account successfully removed" });
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

export default router;
