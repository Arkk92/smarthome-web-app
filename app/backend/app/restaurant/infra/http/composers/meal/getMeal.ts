import { IController } from "@/restaurant/infra/controllers/IController"
import { IMealsRepository } from "@/restaurant/application/repositories/Meal"
import { IGetAllMealUseCase } from "@/restaurant/application/useCases/Meal/GetAllMeal"
import { GetAllMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/GetAllMeal"
import { mongooseClient } from "@/restaurant/infra/database/connect"
import { MealRepository } from "@/restaurant/infra/repositories/Meal"
import { GetMealController } from "@/restaurant/infra/controllers/Meal/GetMeal"

/**
 * Composer function for creating and configuring the components required for retrieving meal information.
 *
 * @function
 * @returns {IController} The configured meal retrieval controller.
 */
export function getMealComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient)
  const useCase: IGetAllMealUseCase = new GetAllMealUseCase(repository)
  const controller: IController = new GetMealController(useCase)
  return controller
}