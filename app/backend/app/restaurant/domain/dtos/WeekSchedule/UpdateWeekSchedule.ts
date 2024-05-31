import { WeekScheduleInterface } from "../../entities/WeekSchedule";

/**
 * Data Transfer Object (DTO) representing the request to update a week schedule.
 *
 * @interface
 */
export interface IUpdateWeekScheduleRequestDTO extends Partial<WeekScheduleInterface> {}
