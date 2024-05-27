import { IController } from "@/restaurant/infra/controllers/IController"
import { IMealsRepository } from "@/restaurant/application/repositories/Meal"
import { mongooseClient } from "@/restaurant/infra/database/connect"
import { MealRepository } from "@/restaurant/infra/repositories/Meal"
import { GetAllMealUseCase } from "@/restaurant/application/useCases/Meal/implementations/GetAllMeal"
import { GetAllMealController } from "@/restaurant/infra/controllers/Meal/GetAllMeal"
import { GetMealByIdUseCase } from "@/restaurant/application/useCases/Meal/implementations/GetMealById"
import { GetMealByNameUseCase } from "@/restaurant/application/useCases/Meal/implementations/GetMealByName"
import { IGetMealByIdUseCase } from "@/restaurant/application/useCases/Meal/GetMealById"
import { GetMealByIdController } from "@/restaurant/infra/controllers/Meal/GetMealById"
import { IGetMealByNameUseCase } from "@/restaurant/application/useCases/Meal/GetMealByName"
import { GetMealByNameController } from "@/restaurant/infra/controllers/Meal/GetMealByName"
import { IGetAllMealUseCase } from "@/restaurant/application/useCases/Meal/GetAllMeal"

/**
 * Composer function for retrieving meal information by id.
 *
 * @function
 * @returns {IController} The configured meal retrieval controller.
 */
export function getMealByIdComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient)
  const useCase: IGetMealByIdUseCase = new GetMealByIdUseCase(repository)
  const controller: IController = new GetMealByIdController(useCase)
  return controller
}

/**
 * Composer function for retrieving meal information by name.
 *
 * @function
 * @returns {IController} The configured meal retrieval controller.
 */
export function getMealByNameComposer(): IController {
  const repository: IMealsRepository = new MealRepository(mongooseClient)
  const useCase: IGetMealByNameUseCase = new GetMealByNameUseCase(repository)
  const controller: IController = new GetMealByNameController(useCase)
  return controller
}

/**
 * Composer function for retrieving all meals information.
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