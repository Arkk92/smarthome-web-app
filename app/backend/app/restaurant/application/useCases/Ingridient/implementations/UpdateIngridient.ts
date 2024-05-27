import { IUpdateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/UpdateIngridient";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { IngridientErrorType } from "../../../../domain/enums/ingridient/ErrorType";
import { IIngridientsRepository } from "../../../repositories/Ingridient";
import { IUpdateIngridientUseCase } from "../UpdateIngridient";
import { IIngridientInRequestDTO } from "@/restaurant/domain/dtos/Ingridient/IngridientIn";

/**
 * Use case for retrieving all ingridients.
 *
 * @class
 * @implements {IUpdateIngridientUseCase}
 */
export class UpdateIngridientUseCase implements IUpdateIngridientUseCase {
  /**
   * Creates an instance of UpdateIngridientUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the update ingridient use case.
   *
   * @async
   * @param {String} id - The id of the ingridient to update
   * @param {IUpdateIngridientRequestDTO} data - The data for updating a ingridient.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    id: string,
    data: IUpdateIngridientRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const ingridientAlreadyExists = (await this.ingridientRepository.findById(
        id
      )) as IIngridientInRequestDTO | null;
      if (!ingridientAlreadyExists) {
        return {
          data: { error: IngridientErrorType.IngridientNotFound },
          success: false,
        };
      }
      const updatedIngridient = await this.ingridientRepository.update(
        ingridientAlreadyExists,
        data
      );
      if (!updatedIngridient) {
        return {
          data: { error: IngridientErrorType.IngridientNotFound },
          success: false,
        };
      }
      return { data: updatedIngridient, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
