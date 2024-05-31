import { WeekScheduleInterface } from "../../entities/WeekSchedule";

/**
 * Data Transfer Object (DTO) representing the input week schedule data.
 *
 * @interface
 */
export interface IWeekScheduleInRequestDTO extends WeekScheduleInterface {
  /**
   * The optional creation date of the week schedule.
   */
  createdAt: Date;
}
