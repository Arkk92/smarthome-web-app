import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { IngridientErrorType } from "@/restaurant/domain/enums/ingridient/ErrorType";
import { IGetIngridientByIdUseCase } from "../GetMealById";

/**
 * Use case for retrieving a ingridient by id.
 *
 * @class
 * @implements {IGetIngridientByIdUseCase}
 */
export class GetIngridientByIdUseCase implements IGetIngridientByIdUseCase {
  /**
   * Creates an instance of GetIngridientByIdUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the get all ingridients use case.
   *
   * @async
   * @param {string} id - The ingridient id
   * @returns {Promise<ResponseDTO>} The response data containing ingridient information.
   */
  async execute(id: string): Promise<ResponseDTO> {
    try {
      const ingridient = await this.ingridientRepository.findById(id);

      if (!ingridient) {
        return {
          data: { error: IngridientErrorType.IngridientNotFound },
          success: false,
        };
      }

      return { data: ingridient, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
