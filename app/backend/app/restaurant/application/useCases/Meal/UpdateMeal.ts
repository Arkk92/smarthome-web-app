import { IUpdateMealRequestDTO } from '@/restaurant/domain/dtos/Meal/UpdateMeal'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating meals.
 *
 * @interface
 */
export interface IUpdateMealUseCase {
  /**
   * Executes the get meals use case.
   *
   * @async
   * @param {String} id - The id of the meal to update
   * @param {IUpdateMealRequestDTO} data - The data for updating a meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: String, data: IUpdateMealRequestDTO): Promise<ResponseDTO>
}