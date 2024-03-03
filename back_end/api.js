// nodejs server to run the application
import express from "express";
import dbConnection from "./src/db/db_connection.js";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import ousRoutes from "./src/routes/ouRoutes.js";
import divisionsRoutes from "./src/routes/divisionsRoutes.js";
import repositoriesRouter from "./src/routes/repositoriesRoute.js";
import cors from "cors";

// Create a new express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
dbConnection();

// Use middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use("/", userRoutes);
app.use("/ous", ousRoutes);
app.use("/divisions", divisionsRoutes);
app.use("/repositories", repositoriesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
