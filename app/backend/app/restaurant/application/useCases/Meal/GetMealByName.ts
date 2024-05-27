import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving a meal by Name.
 *
 * @interface
 */
export interface IGetMealByNameUseCase {
  /**
   * Executes the get meal by name use case.
   *
   * @async
   * @param {string} name - The name of the meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(name: string): Promise<ResponseDTO>
}