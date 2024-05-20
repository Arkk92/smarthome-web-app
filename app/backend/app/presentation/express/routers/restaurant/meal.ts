import { createMealComposer } from "@/restaurant/infra/services/composers/meal/createMeal";
import { expressAdapter } from "@/presentation/adapters/express";
import { Request, Response, Router } from "express";

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
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The meal's name
 *         mealTime:
 *           type: string
 *           description: The meal's time
 *         ingridientList:
 *           type: Array<Ingridient>
 *           description: The list of ingridients
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
 *           type: Array<string>
 *           description: List of steps to make the meal
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
 *             $ref: '#/components/schemas/MealPostSchema'
 *     responses:
 *       201:
 *         description: The meal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealPostSchema'
 *       500:
 *         description: Some server error
 */
mealRoutes.post("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createMealComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

export default mealRoutes;
