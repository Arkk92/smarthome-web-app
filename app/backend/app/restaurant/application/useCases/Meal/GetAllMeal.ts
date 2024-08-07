import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all meals.
 *
 * @interface
 */
export interface IGetAllMealUseCase {
  /**
   * Executes the get all meals use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}