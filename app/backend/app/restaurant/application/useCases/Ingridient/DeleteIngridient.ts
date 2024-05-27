import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a ingridient.
 *
 * @interface
 */
export interface IDeleteIngridientUseCase {
  /**
   * Executes the delete ingridient use case.
   *
   * @async
   * @param {string} ingridientId - The ID of the ingridient to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(ingridientId: string): Promise<ResponseDTO>
}