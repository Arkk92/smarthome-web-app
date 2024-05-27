import { IUpdateIngridientRequestDTO } from '@/restaurant/domain/dtos/Ingridient/UpdateIngridient'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of updating ingridient.
 *
 * @interface
 */
export interface IUpdateIngridientUseCase {
  /**
   * Executes the get ingridient use case.
   *
   * @async
   * @param {String} id - The id of the meal to update
   * @param {IUpdateIngridientRequestDTO} data - The data for updating a meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: String, data: IUpdateIngridientRequestDTO): Promise<ResponseDTO>
}