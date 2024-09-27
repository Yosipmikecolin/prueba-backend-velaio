import express from "express";
import cors from "cors";
import taskRouter from "./routes/create-task.route.js";
const app = express();

//VARS
app.set("port", process.env.PORT || 5000);

//MIDLEWARES
app.use(express.json());
app.use(cors());

//ROURTES
app.use("/api", taskRouter);

//SERVER
app.listen(app.get("port"), () => {
  console.log("Server run in port", app.get("port"));
});
