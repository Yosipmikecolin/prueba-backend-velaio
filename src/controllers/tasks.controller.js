import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const controllerPOST = (req, res) => {
  const data = req.body;
  const folderPath = path.join(__dirname, "..", "database");
  const filePath = path.join(folderPath, "data.json");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  fs.readFile(filePath, "utf8", (err, fileData) => {
    let json = [];

    if (!err && fileData) {
      json = JSON.parse(fileData);
    }
    const taskExists = json.some((task) => task.taskName === data.task.taskName);

    if (taskExists) {
      return res.status(400).json({ message: "La tarea ya existe" });
    }

    json.push(data);

    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
        return res.status(500).json({ message: "Error al guardar la tarea" });
      }
      res.json({ message: "Tarea guardada con éxito" });
    });
  });
};

export const controllerGET = (_req, res) => {
  const filePath = path.join(__dirname, "..", "database", "data.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer las tareas" });
    }

    if (!fileData) {
      return res.json([]);
    }

    try {
      const json = JSON.parse(fileData);
      res.json(json);
    } catch (parseErr) {
      console.error("Error al parsear JSON:", parseErr);
      return res.status(500).json({ error: "Error al procesar los datos" });
    }
  });
};

export const controllerPUT = (req, res) => {
  const { id } = req.params;
  console.log("Updating task with ID:", req);

  const filePath = path.join(__dirname, "..", "database", "data.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ error: "Error al leer las tareas" });
    }

    if (!fileData) {
      return res.status(404).json({ error: "No hay tareas disponibles" });
    }

    let json;
    try {
      json = JSON.parse(fileData);
    } catch (parseErr) {
      console.error("Error al parsear JSON:", parseErr);
      return res.status(500).json({ error: "Error al procesar los datos" });
    }

    const taskIndex = json.findIndex((t) => t.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    json[taskIndex].task.completed = true;

    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
        return res.status(500).json({ error: "Error al actualizar la tarea" });
      }
      res.json({
        message: "Tarea actualizada con éxito",
        task: json[taskIndex],
      });
    });
  });
};
