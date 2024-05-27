import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of retrieving a ingridient by Name.
 *
 * @interface
 */
export interface IGetIngridientByNameUseCase {
  /**
   * Executes the get ingridient by name use case.
   *
   * @async
   * @param {string} name - The name of the ingridient.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(name: string): Promise<ResponseDTO>
}