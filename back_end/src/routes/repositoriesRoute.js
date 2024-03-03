// Repositories routes
import express from "express";
import authMiddleware from "../controllers/auth_middleware.js";

import {
  listRepositories,
  createRepository,
  updateRepository,
  listMyRepositories,
} from "../controllers/repositories_controller.js";

const repositoriesRouter = express.Router();

// Protect all routes in this file
repositoriesRouter.get("/all", authMiddleware, listRepositories);
repositoriesRouter.get("/", authMiddleware, listMyRepositories);
repositoriesRouter.post("/create", authMiddleware, createRepository);
repositoriesRouter.put("/", authMiddleware, updateRepository);

export default repositoriesRouter;
