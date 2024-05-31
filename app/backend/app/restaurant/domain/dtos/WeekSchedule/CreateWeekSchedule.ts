import { WeekScheduleInterface } from "../../entities/WeekSchedule";
import { DayInterface } from "../../valueObj/Day";
import Week from "../../valueObj/Week";

/**
 * Data Transfer Object (DTO) representing the request to create a new week schedule.
 *
 * @interface
 */
export interface ICreateWeekScheduleRequestDTO extends Partial<WeekScheduleInterface> {
    period: Week;
    weekDays: DayInterface[];
}
