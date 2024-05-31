import { ResponseDTO } from "../../../domain/dtos/Response";

/**
 * Interface for the use case of retrieving a weekSchedule by Id.
 *
 * @interface
 */
export interface IGetWeekScheduleByIdUseCase {
  /**
   * Executes the get weekSchedule by id use case.
   *
   * @async
   * @param {string} id - The id of the weekSchedule.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: string): Promise<ResponseDTO>;
}
