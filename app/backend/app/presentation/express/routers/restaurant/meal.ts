import { createMealComposer } from "@/restaurant/infra/http/composers/meal/createMeal";
import { expressAdapter } from "@/presentation/adapters/express";
import { Request, Response, Router } from "express";
import { updateMealComposer } from "@/restaurant/infra/http/composers/meal/updateMeal";
import { deleteMealComposer } from "@/restaurant/infra/http/composers/meal/deleteMeal";
import { getAllMealComposer, getMealByIdComposer, getMealByNameComposer } from "@/restaurant/infra/http/composers/meal/getMeal";

/**
 * Router for handling meal-related routes.
 */
const mealRoutes = Router();

mealRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

mealRoutes.get("/all", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

mealRoutes.get("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getMealByIdComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

mealRoutes.get("/name/:name", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getMealByNameComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

mealRoutes.patch("/update/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

mealRoutes.delete("/delete/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default mealRoutes;
