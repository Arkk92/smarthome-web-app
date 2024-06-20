import cors from "cors";
import express from "express";

import mealRoutes from "../routers/restaurant/meal";
import { setupSwagger } from "../docs/swagger";
import dotenv from "dotenv";
import { setupLogger } from "../docs/logger";
import ingridientRoutes from "../routers/restaurant/ingridient";
import weekScheduleRoutes from "../routers/restaurant/weekSchedule";


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
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

setupSwagger(app);
setupLogger(app);

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
app.use("/meal", mealRoutes);
app.use("/ingridient", ingridientRoutes);
app.use("/weekSchedule", weekScheduleRoutes);

export { app };
