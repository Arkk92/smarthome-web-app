import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";
import { IngridientErrorType } from "@/restaurant/domain/enums/ingridient/ErrorType";
import { IDeleteIngridientUseCase } from "../DeleteIngridient";
import { IngridientSuccessType } from "@/restaurant/domain/enums/ingridient/SuccessType";

/**
 * Use case for deleting a ingridient.
 *
 * @class
 * @implements {IDeleteIngridientUseCase}
 */
export class DeleteIngridientUseCase implements IDeleteIngridientUseCase {
  /**
   * Creates an instance of DeleteIngridientUseCase.
   *
   * @constructor
   * @param {IIngridientsRepository} ingridientRepository - The repository for ingridient data.
   */
  constructor(private ingridientRepository: IIngridientsRepository) {}

  /**
   * Executes the delete ingridient use case.
   *
   * @async
   * @param {string} ingridientId - The ID of the ingridient to be deleted.
   * @returns {Promise<{ data: { error?: IngridientErrorType | IngridientSuccessType }, success: boolean }>} The response data.
   */
  async execute(ingridientId: string): Promise<{
    data: { error?: IngridientErrorType | IngridientSuccessType };
    success: boolean;
  }> {
    try {
      const ingridientAlreadyExists = await this.ingridientRepository.findById(
        ingridientId
      );

      if (!ingridientAlreadyExists) {
        return {
          data: { error: IngridientErrorType.IngridientDoesNotExist },
          success: false,
        };
      }

      await this.ingridientRepository.delete(ingridientId);
      return {
        data: { error: IngridientSuccessType.IngridientDeleted },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
