import express from 'express';
const router = express.Router();
import { loginAdmin, getAllUsers, getUser, createAdmin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post("/createAdmin", createAdmin);

router.post("/login", loginAdmin)

router.get("/getAllUsers", authMiddleware , getAllUsers);

router.get("/getUser/:id", authMiddleware, getUser);

export default router;