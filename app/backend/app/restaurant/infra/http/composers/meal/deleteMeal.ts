import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { IDeleteMealUseCase } from "@/restaurant/application/useCases/Meal/DeleteMeal";
import { DeleteMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/DeleteMeal";
import { IController } from "@/restaurant/infra/controllers/IController";
import { DeleteMealController } from "@/restaurant/infra/controllers/Meal/DeleteMeal";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";

/**
 * Composer function for creating and configuring the components required for meal deletion.
 *
 * @function
 * @returns {IController} The configured meal deletion controller.
 */
export function deleteMealComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient);
  const useCase: IDeleteMealUseCase = new DeleteMealUseCase(repository);
  const controller: IController = new DeleteMealController(useCase);
  return controller;
}
