import { WeekScheduleInterface } from "@/restaurant/domain/entities/WeekSchedule";
import Day from "@/restaurant/domain/valueObj/Day";
import Week from "@/restaurant/domain/valueObj/Week";
import { Schema, model, Document } from "mongoose";

/**
 * Interface representing the structure of a week schedule.
 *
 * @interface
 */
interface IWeekSchedule extends WeekScheduleInterface, Document {
  id: String;
}

const WeekScheduleSchema = new Schema<IWeekSchedule>({
  period: { type: Week },
  weekDays: { type: Array<Day>() },
});

const WeekScheduleModel = model("WeekScheduleSchema", WeekScheduleSchema);

export default WeekScheduleModel;
