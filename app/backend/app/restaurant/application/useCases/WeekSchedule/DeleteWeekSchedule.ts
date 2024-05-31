import { ResponseDTO } from "../../../domain/dtos/Response";

/**
 * Interface for the use case of deleting a weekSchedule.
 *
 * @interface
 */
export interface IDeleteWeekScheduleUseCase {
  /**
   * Executes the delete weekSchedule use case.
   *
   * @async
   * @param {string} weekScheduleId - The ID of the weekSchedule to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(weekScheduleId: string): Promise<ResponseDTO>;
}
