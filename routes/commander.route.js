import express from "express";
import { createCommander, loginCommander, getAllCommander, logoutCommander } from "../controllers/commander.controller.js";
import { IsAuthCommander } from "../middlewares/isAuthentication.js";
const router = express.Router();

router.post("/register", createCommander);
router.post('/login', loginCommander);

router.use(IsAuthCommander);

router.get('/profile', getAllCommander);
router.get("/logout", logoutCommander);

export default router;