import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving a ingridient by Id.
 *
 * @interface
 */
export interface IGetIngridientByIdUseCase {
  /**
   * Executes the get ingridient by id use case.
   *
   * @async
   * @param {string} id - The id of the ingridient.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: string): Promise<ResponseDTO>
}