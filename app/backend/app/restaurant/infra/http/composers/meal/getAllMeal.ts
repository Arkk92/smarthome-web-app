import { IController } from "@/restaurant/infra/controllers/IController"
import { IMealsRepository } from "@/restaurant/application/repositories/Meal"
import { IGetAllMealUseCase } from "@/restaurant/application/useCases/Meal/GetAllMeal"
import { GetAllMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/GetAllMeal"
import { mongooseClient } from "@/restaurant/infra/database/connect"
import { MealRepository } from "@/restaurant/infra/repositories/Meal"
import { GetAllMealController } from "@/restaurant/infra/controllers/Meal/GetAllMeal"

/**
 * Composer function for creating and configuring the components required for retrieving meal information.
 *
 * @function
 * @returns {IController} The configured meal retrieval controller.
 */
export function getAllMealComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient)
  const useCase: IGetAllMealUseCase = new GetAllMealUseCase(repository)
  const controller: IController = new GetAllMealController(useCase)
  return controller
}