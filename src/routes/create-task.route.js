import { Router } from "express";
import {
  controllerPOST,
  controllerGET,
} from "../controllers/tasks.controller.js";
const router = Router();

router.post("/create-task", controllerPOST);
router.get("/get-tasks", controllerGET);

export default router;
