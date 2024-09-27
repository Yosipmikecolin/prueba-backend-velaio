import { Router } from "express";
import { controllerPOST } from "../controllers/tasks.controller.js";
const router = Router();

router.post("/create-task", controllerPOST);

export default router;
