import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { IDeleteIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/DeleteIngridient";
import { DeleteIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/DeleteIngridient";
import { IController } from "@/restaurant/infra/controllers/IController";
import { DeleteIngridientController } from "@/restaurant/infra/controllers/Ingridient/DeleteIngridient";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { IngridientRepository } from "@/restaurant/infra/repositories/Ingridient";

/**
 * Composer function for creating and configuring the components required for ingridient deletion.
 *
 * @function
 * @returns {IController} The configured ingridient deletion controller.
 */
export function deleteIngridientComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(mongooseClient);
  const useCase: IDeleteIngridientUseCase = new DeleteIngridientUseCase(repository);
  const controller: IController = new DeleteIngridientController(useCase);
  return controller;
}
