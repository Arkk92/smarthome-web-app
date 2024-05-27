import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient"
import { IGetAllIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/GetAllIngridient"
import { IGetIngridientByNameUseCase } from "@/restaurant/application/useCases/Ingridient/GetIngridientlByName"
import { IGetIngridientByIdUseCase } from "@/restaurant/application/useCases/Ingridient/GetMealById"
import { GetAllIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/GetAllIngridient"
import { GetIngridientByNameUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/GetIngridientByName"
import { GetIngridientByIdUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/GetMealById"
import { IController } from "@/restaurant/infra/controllers/IController"
import { GetAllIngridientController } from "@/restaurant/infra/controllers/Ingridient/GetAllIngridient"
import { GetIngridientByIdController } from "@/restaurant/infra/controllers/Ingridient/GetIngridientById"
import { GetIngridientByNameController } from "@/restaurant/infra/controllers/Ingridient/GetIngridientByName"
import { mongooseClient } from "@/restaurant/infra/database/connect"
import { IngridientRepository } from "@/restaurant/infra/repositories/Ingridient"

/**
 * Composer function for retrieving ingridient information by id.
 *
 * @function
 * @returns {IController} The configured ingridient retrieval controller.
 */
export function getIngridientByIdComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient)
  const useCase: IGetIngridientByIdUseCase = new GetIngridientByIdUseCase(repository)
  const controller: IController = new GetIngridientByIdController(useCase)
  return controller
}

/**
 * Composer function for retrieving ingridient information by name.
 *
 * @function
 * @returns {IController} The configured ingridient retrieval controller.
 */
export function getIngridientByNameComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient)
  const useCase: IGetIngridientByNameUseCase = new GetIngridientByNameUseCase(repository)
  const controller: IController = new GetIngridientByNameController(useCase)
  return controller
}

/**
 * Composer function for retrieving all ingridients information.
 *
 * @function
 * @returns {IController} The configured ingridient retrieval controller.
 */
export function getAllIngridientComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient)
  const useCase: IGetAllIngridientUseCase = new GetAllIngridientUseCase(repository)
  const controller: IController = new GetAllIngridientController(useCase)
  return controller
}