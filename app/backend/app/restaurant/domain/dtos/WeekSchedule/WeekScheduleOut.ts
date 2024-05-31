import { WeekScheduleInterface } from "../../entities/WeekSchedule";
/**
 * Data Transfer Object (DTO) representing the output week schedule data.
 *
 * @interface
 */
export interface IWeekScheduleOutRequestDTO extends WeekScheduleInterface {
  /**
   * The optional creation date of the week schedule.
   */
  createdAt?: Date;
}
