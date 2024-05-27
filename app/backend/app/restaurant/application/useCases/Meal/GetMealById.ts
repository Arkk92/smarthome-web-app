import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving a meal by Id.
 *
 * @interface
 */
export interface IGetMealByIdUseCase {
  /**
   * Executes the get meal by id use case.
   *
   * @async
   * @param {string} id - The id of the meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: string): Promise<ResponseDTO>
}