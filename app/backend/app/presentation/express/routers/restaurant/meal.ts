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

/**
 * @swagger
 * components:
 *   schemas:
 *     MealGetSchema:
 *       type: object
 *       required:
 *         - name
 *         - mealTime
 *         - ingridientList
 *         - isVegetarian
 *         - season
 *         - babyAllowed
 *         - recipe
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the meal
 *         name:
 *           type: string
 *           description: The meal's name
 *         mealTime:
 *           type: string
 *           description: The meal's time
 *         ingridientList:
 *           type: array
 *           description: The list of ingridients
 *           items:
 *              type: object
 *              decription: Ingridients
 *         isVegetarian:
 *           type: boolean
 *           description: Whether is a vegetarian meal
 *         season:
 *           type: string
 *           description: The season of meal
 *         babyAllowed:
 *           type: boolean
 *           description: Whether is allowed for babies
 *         recipe:
 *           type: array
 *           description: List of steps to make the meal
 *           items:
 *            type: string
 *            description: recipe steps
 *
 *     MealPostSchema:
 *       type: object
 *       required:
 *         - name
 *         - mealTime
 *         - ingridientList
 *         - isVegetarian
 *         - season
 *         - babyAllowed
 *         - recipe
 *       properties:
 *         name:
 *           type: string
 *           description: The meal's name
 *         mealTime:
 *           type: string
 *           enum: [Breakfast, Lunch, Dinner]
 *           description: The meal's time
 *         ingridientList:
 *           type: array
 *           description: The list of ingridients
 *           items:
 *              type: object
 *              decription: Ingridients
 *         isVegetarian:
 *           type: boolean
 *           description: Whether is a vegetarian meal
 *         season:
 *           type: string
 *           enum: [Warm, Cold]
 *           description: The season of meal
 *         babyAllowed:
 *           type: boolean
 *           description: Whether is allowed for babies
 *         recipe:
 *           type: array
 *           description: List of steps to make the meal
 *           items:
 *            type: string
 *            description: recipe steps
 *         batchMealCount:
 *           type: number
 *           description: Number of meal bacthes
 *
 *     MealPutSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The meal's name
 *         mealTime:
 *           type: string
 *           enum: [Breakfast, Lunch, Dinner]
 *           description: The meal's time
 *         ingridientList:
 *           type: array
 *           description: The list of ingridients
 *           items:
 *              type: object
 *              decription: Ingridients
 *         isVegetarian:
 *           type: boolean
 *           description: Whether is a vegetarian meal
 *         season:
 *           type: string
 *           enum: [Warm, Cold]
 *           description: The season of meal
 *         babyAllowed:
 *           type: boolean
 *           description: Whether is allowed for babies
 *         recipe:
 *           type: array
 *           description: List of steps to make the meal
 *           items:
 *            type: string
 *            description: recipe steps
 *         batchMealCount:
 *           type: number
 *           description: Number of meal bacthes
 *
 */

/**
 * @swagger
 * /meal:
 *   post:
 *     summary: Create a new meal
 *     tags: [Meals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MealPutSchema'
 *     responses:
 *       201:
 *         description: The meal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealPutSchema'
 *       500:
 *         description: Some server error
 */
mealRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /meal/all:
 *   get:
 *     summary: Retrieves all meals
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: page number to be shown
 *     responses:
 *       201:
 *         description: The meal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealGetSchema'
 *       500:
 *         description: Some server error
 */
mealRoutes.get("/all", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAllMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /meal/id/{id}:
 *   get:
 *     summary: Get meal by Id
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Meal's id,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: Meal does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Meal does not exits!
 *       200:
 *         description: The meal was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealGetSchema"
 *       500:
 *         description: Some server error
 */
mealRoutes.get("/id/:id", async (request: Request, response: Response) => {
  console.log(request.path)
  const adapter = await expressAdapter(request, getMealByIdComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /meal/name/{name}:
 *   get:
 *     summary: Get meal by Name
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Meal's name,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *         description: Meal does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Meal does not exits!
 *       200:
 *         description: The meal was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealGetSchema"
 *       500:
 *         description: Some server error
 */
mealRoutes.get("/name/:name", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getMealByNameComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /meal/id/{id}:
 *   patch:
 *     summary: Update meal
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Meal's id for update,
 *         required: true,
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealPutSchema"
 *     responses:
 *       400:
 *         description: Meal does not exits!,
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Meal does not exits!
 *       200:
 *         description: The meal was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealGetSchema"
 *       500:
 *         description: Some server error
 */
mealRoutes.patch("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

/**
 * @swagger
 * /meal/id/{id}:
 *   delete:
 *     summary: Delete meal
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Meal's id for delete,
 *         required: true,
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The meal was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealGetSchema'
 *       500:
 *         description: Some server error
 */
mealRoutes.delete("/id/:id", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default mealRoutes;
