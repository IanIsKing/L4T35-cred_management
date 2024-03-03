// router for ous routes
import express from "express";
import authMiddleware from "../controllers/auth_middleware.js";

import {
  listOUs,
  createOU,
  updateOU,
  getOU,
} from "../../src/controllers/ou_controller.js";

const ousRouter = express.Router();

ousRouter.get("/all", authMiddleware, listOUs);
ousRouter.post("/create", authMiddleware, createOU);
ousRouter.patch("/:id", authMiddleware, updateOU);
ousRouter.get("/:id", authMiddleware, getOU);

export default ousRouter;
