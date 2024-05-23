import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { ICreateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/CreateIngridient";
import { IngridientErrorType } from "@/restaurant/domain/enums/ingridient/ErrorType";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { ICreateIngridientUseCase } from "../CreateIngridient";

/**
 * Use case for creating a new ingridient.
 *
 * @class
 * @implements {ICreateIngridientUseCase}
 */
export class CreateIngridientUseCase implements ICreateIngridientUseCase {
  /**
   * Creates an instance of CreateIngridientUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the create ingridient use case.
   *
   * @async
   * @param {ICreateIngridientRequestDTO} request - The ingridient creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(request: ICreateIngridientRequestDTO): Promise<ResponseDTO> {
    try {
      const ingridientEntity = Ingridient.create(request);

      const ingridientAlreadyExists =
        await this.ingridientRepository.findByName(ingridientEntity.name);

      if (ingridientAlreadyExists) {
        return {
          data: { error: IngridientErrorType.IngridientAlreadyExists },
          success: false,
        };
      }

      const ingridient = await this.ingridientRepository.create({
        name: ingridientEntity.name,
        quantity: ingridientEntity.quantity,
        apiUri: ingridientEntity.apiUri
      });

      return { data: ingridient, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
