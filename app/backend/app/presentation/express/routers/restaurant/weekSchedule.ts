import { expressAdapter } from "@/presentation/adapters/express";
import { createWeekScheduleComposer } from "@/restaurant/infra/http/composers/weekSchedule/createWeekSchedule";
import { deleteWeekScheduleComposer } from "@/restaurant/infra/http/composers/weekSchedule/deleteWeekSchedule";
import { getAllWeekScheduleComposer, getWeekScheduleByDateComposer, getWeekScheduleByIdComposer } from "@/restaurant/infra/http/composers/weekSchedule/getWeekSchedule";
import { updateWeekScheduleComposer } from "@/restaurant/infra/http/composers/weekSchedule/updateWeekSchedule";
import { Request, Response, Router } from "express";

/**
 * Router for handling weekSchedule-related routes.
 */
const weekScheduleRoutes = Router();


weekScheduleRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createWeekScheduleComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

weekScheduleRoutes.get("/all", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllWeekScheduleComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

weekScheduleRoutes.get("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getWeekScheduleByIdComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

weekScheduleRoutes.get("/date/:date", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getWeekScheduleByDateComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

weekScheduleRoutes.patch("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateWeekScheduleComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

weekScheduleRoutes.delete("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteWeekScheduleComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default weekScheduleRoutes;
