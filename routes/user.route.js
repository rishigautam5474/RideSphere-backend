import express from "express";
import { createNewUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import IsAuthentication from "../middlewares/isAuthentication.js";
const router = express.Router();

router.post('/register', createNewUser);
router.post('/login', loginUser);

router.use(IsAuthentication);

router.get('/profile', getUserProfile)
router.get('/logout', logoutUser)

export default router;