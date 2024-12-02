import express from "express";
import { createNewUser, loginUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/register', createNewUser);
router.post('/login', loginUser)

export default router;