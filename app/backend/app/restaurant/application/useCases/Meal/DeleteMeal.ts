import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of deleting a meal.
 *
 * @interface
 */
export interface IDeleteMealUseCase {
  /**
   * Executes the delete meal use case.
   *
   * @async
   * @param {string} mealId - The ID of the meal to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(mealId: string): Promise<ResponseDTO>
}