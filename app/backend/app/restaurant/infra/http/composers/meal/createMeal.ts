import { IController } from "@/restaurant/infra/controllers/IController";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { ICreateMealUseCase } from "@/restaurant/application/useCases/Meal/CreateMeal";
import { CreateMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/CreateMeal";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { CreateMealController } from "@/restaurant/infra/controllers/Meal/CreateMeal";

/**
 * Composer function for creating and configuring the components required for meal creation.
 *
 * @function
 * @returns {IController} The configured meal creation controller.
 */
export function createMealComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient);
  const useCase: ICreateMealUseCase = new CreateMealUseCase(repository);
  const controller: IController = new CreateMealController(useCase);
  return controller;
}
