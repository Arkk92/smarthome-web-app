import { IController } from "@/restaurant/infra/controllers/IController";
import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { IGetAllIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/GetAllIngridient";
import { GetAllIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/implementations/GetAllIngridient";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { IngridientRepository } from "@/restaurant/infra/repositories/Ingridient";
import { GetIngridientController } from "@/restaurant/infra/controllers/restaurant/Meal/Implementations/GetIngridient";

/**
 * Composer function for creating and configuring the components required for retrieving ingridient information.
 *
 * @function
 * @returns {IController} The configured ingridient retrieval controller.
 */
export function getIngridientComposer(): IController {
  const repository: IIngridientsRepository = new IngridientRepository(
    mongooseClient
  );
  const useCase: IGetAllIngridientUseCase = new GetAllIngridientUseCase(
    repository
  );
  const controller: IController = new GetIngridientController(useCase);
  return controller;
}
