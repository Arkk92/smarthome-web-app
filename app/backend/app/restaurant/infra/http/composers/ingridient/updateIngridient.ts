import { IController } from "@/restaurant/infra/controllers/IController";
import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { IngridientRepository } from "@/restaurant/infra/repositories/Ingridient";
import { IUpdateIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/UpdateIngridient";
import { UpdateIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/UpdateIngridient";
import { UpdateIngridientController } from "@/restaurant/infra/controllers/Ingridient/UpdateIngridient";


/**
 * Composer function for creating and configuring the components required for ingridient creation.
 *
 * @function
 * @returns {IController} The configured ingridient creation controller.
 */
export function updateIngridientComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient);
  const useCase: IUpdateIngridientUseCase = new UpdateIngridientUseCase(repository);
  const controller: IController = new UpdateIngridientController(useCase);
  return controller;
}
