// Divisions routes
import express from "express";
import authMiddleware from "../controllers/auth_middleware.js";

import {
  listDivisions,
  createDivision,
  getDivision,
} from "../../src/controllers/division_controller.js";

const divisionsRouter = express.Router();

// Protect all routes in this file
divisionsRouter.get("/all", authMiddleware, listDivisions);
divisionsRouter.get("/:id", authMiddleware, getDivision);
divisionsRouter.post("/create", authMiddleware, createDivision);

export default divisionsRouter;
