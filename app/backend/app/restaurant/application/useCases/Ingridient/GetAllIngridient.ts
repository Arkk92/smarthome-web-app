import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving all ingridient.
 *
 * @interface
 */
export interface IGetAllIngridientUseCase {
  /**
   * Executes the get all ingridient use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}