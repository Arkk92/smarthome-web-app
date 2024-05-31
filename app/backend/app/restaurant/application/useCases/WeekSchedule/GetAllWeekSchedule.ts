import { ResponseDTO } from "../../../domain/dtos/Response";

/**
 * Interface for the use case of retrieving all weekSchedules.
 *
 * @interface
 */
export interface IGetAllWeekScheduleUseCase {
  /**
   * Executes the get all weekSchedules use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>;
}
