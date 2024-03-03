// router for user routes
import express from "express";
import authMiddleware from "../controllers/auth_middleware.js";
import {
  authUser,
  verifyToken,
  createUser,
  getAvatars,
  getAllUsers,
  updateUser,
} from "../controllers/auth_controller.js";

const router = express.Router();

// Define unprotected routes
router.post("/login", authUser);
router.post("/signup", createUser);
router.get("/avatars", getAvatars);

// Define protected routes, applying the authMiddleware
router.get("/verifyToken", authMiddleware, verifyToken);
router.get("/users", authMiddleware, getAllUsers);
router.put("/users/:id", authMiddleware, updateUser);

export default router;
