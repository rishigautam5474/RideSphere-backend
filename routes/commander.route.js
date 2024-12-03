import express from "express";
import { createCommander, loginCommander, getAllCommander } from "../controllers/commander.controller.js";
import IsAuthCommander from "../middlewares/isAuthCommander.js";
const router = express.Router();

router.post("/register", createCommander);
router.post('/login', loginCommander);

router.use(IsAuthCommander);

router.get('/', getAllCommander);

export default router;