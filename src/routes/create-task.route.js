import { Router } from "express";
import {
  controllerPOST,
  controllerGET,
  controllerPUT,
} from "../controllers/tasks.controller.js";
const router = Router();

router.post("/create-task", controllerPOST);
router.put("/updated-task/:id", controllerPUT);
router.get("/get-tasks", controllerGET);

export default router;
