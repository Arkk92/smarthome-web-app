import cors from "cors";
import express from "express";

import mealRoutes from "../routers/restaurant/meal";
import { setupSwagger } from "../docs/swagger";
import dotenv from "dotenv";

dotenv.config();

/**
 * Express application instance.
 */
const app = express();

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
setupSwagger(app);
app.use("/meal", mealRoutes);

export { app };
