import { IUpdateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/UpdateWeekSchedule";
import { ResponseDTO } from "../../../domain/dtos/Response";

/**
 * Interface for the use case of updating weekSchedules.
 *
 * @interface
 */
export interface IUpdateWeekScheduleUseCase {
  /**
   * Executes the get weekSchedules use case.
   *
   * @async
   * @param {String} id - The id of the weekSchedule to update
   * @param {IUpdateWeekScheduleRequestDTO} data - The data for updating a weekSchedule.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    id: String,
    data: IUpdateWeekScheduleRequestDTO
  ): Promise<ResponseDTO>;
}
