import express from "express";
import {
  getProfile,
  getProfileById,
  updateProfile,
  profile,
  logout
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import logoutMiddleware from "../middleware/logoutMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, logoutMiddleware,profile);
router.get("/profiles", authMiddleware, getProfile);
router.get("/profile/:id", authMiddleware, getProfileById);
router.put("/profile/:id", authMiddleware, updateProfile);
router.post("/logout", authMiddleware, logout);

export default router;
