import { IngridientErrorType } from "@/restaurant/domain/enums/ingridient/ErrorType";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { IIngridientsRepository } from "../../../repositories/Ingridient";
import { IGetAllIngridientUseCase } from "../GetAllIngridient";

/**
 * Use case for retrieving all ingridients.
 *
 * @class
 * @implements {IGetAllIngridientUseCase}
 */
export class GetAllIngridientUseCase implements IGetAllIngridientUseCase {
  /**
   * Creates an instance of GetAllIngridientUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the get all ingridients use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing ingridient information.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const ingridients = await this.ingridientRepository.findAll(page);

      if (ingridients.total === 0) {
        return {
          data: { error: IngridientErrorType.IngridientNotFound },
          success: false,
        };
      }

      return { data: ingridients, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
