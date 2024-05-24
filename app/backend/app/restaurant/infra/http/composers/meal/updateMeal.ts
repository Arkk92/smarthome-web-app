import { IController } from "@/restaurant/infra/controllers/IController";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { IUpdateMealUseCase } from "@/restaurant/application/useCases/Meal/UpdateMeal";
import { UpdateMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/UpdateMeal";
import { UpdateMealController } from "@/restaurant/infra/controllers/Meal/UpdateMeal";


/**
 * Composer function for creating and configuring the components required for meal creation.
 *
 * @function
 * @returns {IController} The configured meal creation controller.
 */
export function updateMealComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient);
  const useCase: IUpdateMealUseCase = new UpdateMealUseCase(repository);
  const controller: IController = new UpdateMealController(useCase);
  return controller;
}
