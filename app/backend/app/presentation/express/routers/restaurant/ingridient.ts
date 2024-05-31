import { createIngridientComposer } from "@/restaurant/infra/http/composers/ingridient/createIngridient";
import { expressAdapter } from "@/presentation/adapters/express";
import { Request, Response, Router } from "express";
import { getAllIngridientComposer, getIngridientByIdComposer, getIngridientByNameComposer } from "@/restaurant/infra/http/composers/ingridient/getIngridient";
import { updateIngridientComposer } from "@/restaurant/infra/http/composers/ingridient/updateIngridient";
import { deleteIngridientComposer } from "@/restaurant/infra/http/composers/ingridient/deleteIngridient";


/**
 * Router for handling ingridient-related routes.
 */
const ingridientRoutes = Router();

ingridientRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});
ingridientRoutes.get("/all", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});
ingridientRoutes.get("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getIngridientByIdComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});
ingridientRoutes.get("/name/:name", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getIngridientByNameComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});
ingridientRoutes.patch("/update/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});
ingridientRoutes.delete("/delete/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default ingridientRoutes;
