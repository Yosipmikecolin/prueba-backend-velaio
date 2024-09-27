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

    const taskExists = json.some((task) => task.taskName === data.taskName);

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
