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

/**
 * @swagger
 * components:
 *   schemas:
 *     IngridientGetSchema:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - apiUri
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the ingridient
 *         name:
 *           type: string
 *           description: The ingridient's name
 *         quantity:
 *           type: number
 *           description: Quantity of the bought ingridient
 *         apiUri:
 *           type: string
 *           description: API uri to shop where to buy the ingridient
 * 
 *     IngridientPostSchema:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - apiUri
 *       properties:
 *         name:
 *           type: string
 *           description: The ingridient's name
 *         quantity:
 *           type: number
 *           description: Quantity of the bought ingridient
 *         apiUri:
 *           type: string
 *           description: API uri to shop where to buy the ingridient
 *         unit:
 *           type: string
 *           description: The unit the ingridient uses (Kg, L, etc)
 * 
 *     IngridientPutSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The ingridient's name
 *         quantity:
 *           type: number
 *           description: Quantity of the bought ingridient
 *         apiUri:
 *           type: string
 *           description: API uri to shop where to buy the ingridient
 *         unit:
 *           type: string
 *           description: The unit the ingridient uses (Kg, L, etc)
 *
 */

/**
 * @swagger
 * /ingridient:
 *   post:
 *     summary: Create a new ingridient
 *     tags: [Ingridients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngridientPostSchema'
 *     responses:
 *       201:
 *         description: The ingridient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngridientGetSchema'
 *       500:
 *         description: Some server error
 */
ingridientRoutes.post("/", async (request: Request, response: Response) => {
  console.log("Creating ingridient")
  console.log(request.body)
  const adapter = await expressAdapter(request, createIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /ingridient/all:
 *   get:
 *     summary: Retrieves all ingridients
 *     tags: [Ingridients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: page number to be shown
 *     responses:
 *       201:
 *         description: The ingridient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngridientGetSchema'
 *       500:
 *         description: Some server error
 */
ingridientRoutes.get("/all", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /ingridient/id/{id}:
 *   get:
 *     summary: Get ingridient by Id
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ingridient's id,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: Ingridient does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Ingridient does not exits!
 *       200:
 *         description: The ingridient was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngridientGetSchema"
 *       500:
 *         description: Some server error
 */
ingridientRoutes.get("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getIngridientByIdComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /ingridient/name/{name}:
 *   get:
 *     summary: Get ingridient by Name
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Ingridient's name,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: Ingridient does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Ingridient does not exits!
 *       200:
 *         description: The ingridient was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngridientGetSchema"
 *       500:
 *         description: Some server error
 */
ingridientRoutes.get("/name/:name", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getIngridientByNameComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /ingridient/id/{id}:
 *   patch:
 *     summary: Update ingridient
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ingridient's id for update,
 *         required: true,
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IngridientPutSchema"
 *     responses:
 *       400:
 *         description: Ingridient does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Ingridient does not exits!
 *       200:
 *         description: The ingridient was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngridientGetSchema"
 *       500:
 *         description: Some server error
 */
ingridientRoutes.patch("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /ingridient/id/{id}:
 *   delete:
 *     summary: Delete ingridient
 *     tags: [Ingridients]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Ingridient's id for delete,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The ingridient was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngridientGetSchema'
 *       500:
 *         description: Some server error
 */
ingridientRoutes.delete("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default ingridientRoutes;
