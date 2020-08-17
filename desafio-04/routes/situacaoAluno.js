import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/totalNota", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const { student, subject } = req.body;

    let total = 0;

    data.grades.map((grade) => {
      if (student === grade.student && subject === grade.subject) {
        total += grade.value;
      }
    });
    return res.status(200).json(total);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.get("/mediaGrades", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const { subject, type } = req.body;

    let acc = 0;
    let total = 0;
    let media = null;

    data.grades.map((grade) => {
      if (type === grade.type && subject === grade.subject) {
        acc++;
        total += grade.value;
      }
    });

    media = total / acc;

    return res.status(200).json(media);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

router.get("/topThree", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const { subject, type } = req.body;

    const topThree = [];
    let cont = 1;

    data.grades.map((grade) => {
      if (type === grade.type && subject === grade.subject && cont < 4) {
        cont++;
        topThree.push(grade);
        topThree.sort((a, b) => b.value - a.value);
      }
    });

    return res.status(200).json(topThree);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
});

export default router;
