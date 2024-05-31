import { ResponseDTO } from "../../../domain/dtos/Response";

/**
 * Interface for the use case of retrieving a weekSchedule by Date.
 *
 * @interface
 */
export interface IGetWeekScheduleByDateUseCase {
  /**
   * Executes the get weekSchedule by date use case.
   *
   * @async
   * @param {Date} date - The date of the weekSchedule.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(date: Date): Promise<ResponseDTO>;
}
