import { ICreateIngridientRequestDTO } from '@/restaurant/domain/dtos/Ingridient/CreateIngridient'
import { ResponseDTO } from '@/restaurant/domain/dtos/Response'


/**
 * Interface for the use case of creating a new ingridient.
 *
 * @interface
 */
export interface ICreateIngridientUseCase {
  /**
   * Executes the create ingridient use case.
   *
   * @async
   * @param {ICreateIngridientRequestDTO} data - The data for creating a new ingridient.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateIngridientRequestDTO): Promise<ResponseDTO>
}