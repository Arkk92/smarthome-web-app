import { IController } from "@/restaurant/infra/controllers/IController"
import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient"
import { ICreateIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/CreateIngridient"
import { CreateIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/CreateIngridient"
import { mongooseClient } from "@/restaurant/infra/database/connect"
import { IngridientRepository } from "@/restaurant/infra/repositories/Ingridient"
import { CreateIngridientController } from "@/restaurant/infra/controllers/Ingridient/CreateIngridient"


/**
 * Composer function for creating and configuring the components required for ingridient creation.
 *
 * @function
 * @returns {IController} The configured ingridient creation controller.
 */
export function createIngridientComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient)
  const useCase: ICreateIngridientUseCase = new CreateIngridientUseCase(
    repository,
  )
  const controller: IController = new CreateIngridientController(useCase)
  return controller
}