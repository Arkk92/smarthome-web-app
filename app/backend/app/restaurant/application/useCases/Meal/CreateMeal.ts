import { ICreateMealRequestDTO } from '@/restaurant/domain/dtos/Meal/CreateMeal'
import { ResponseDTO } from '@/restaurant/domain/dtos/Response'


/**
 * Interface for the use case of creating a new meal.
 *
 * @interface
 */
export interface ICreateMealUseCase {
  /**
   * Executes the create meal use case.
   *
   * @async
   * @param {ICreateMealRequestDTO} data - The data for creating a new meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateMealRequestDTO): Promise<ResponseDTO>
}