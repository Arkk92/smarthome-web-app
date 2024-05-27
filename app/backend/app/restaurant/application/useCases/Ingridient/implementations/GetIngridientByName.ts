import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { IngridientErrorType } from "@/restaurant/domain/enums/ingridient/ErrorType";
import { IGetIngridientByNameUseCase } from "../GetIngridientlByName";


/**
 * Use case for retrieving a ingridient by name.
 *
 * @class
 * @implements {IGetIngridientByNameUseCase}
 */
export class GetIngridientByNameUseCase implements IGetIngridientByNameUseCase {
  /**
   * Creates an instance of GetIngridientByNameUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the get all ingridients use case.
   *
   * @async
   * @param {string} name - The ingridient name
   * @returns {Promise<ResponseDTO>} The response data containing ingridient information.
   */
  async execute(name: string): Promise<ResponseDTO> {
    try {
      const ingridient = await this.ingridientRepository.findByName(name);
      
      if (!ingridient) {
        return { data: { error: IngridientErrorType.IngridientNotFound }, success: false };
      }

      return { data: ingridient, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
