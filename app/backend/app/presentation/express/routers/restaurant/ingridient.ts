import { createIngridientComposer } from "@/restaurant/infra/http/composers/ingridient/createIngridient";
import { expressAdapter } from "@/presentation/adapters/express";
import { Request, Response, Router } from "express";
import { getIngridientComposer } from "@/restaurant/infra/http/composers/ingridient/getIngridient";


/**
 * Router for handling ingridient-related routes.
 */
const ingridientRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     IngridientBaseSchema:
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
 *               $ref: '#/components/schemas/IngridientBaseSchema'
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
 * /ingridient:
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
 *               $ref: '#/components/schemas/IngridientBaseSchema'
 *       500:
 *         description: Some server error
 */
ingridientRoutes.get("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getIngridientComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default ingridientRoutes;
