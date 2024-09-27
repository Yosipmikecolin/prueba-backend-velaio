import express from "express";
const app = express();

//VARS
app.set("port", process.env.PORT || 5000);

//MIDLEWARES
app.use(express.json());

//SERVER
app.listen(app.get("port"), () => {
  console.log("Server run in port", app.get("port"));
});
