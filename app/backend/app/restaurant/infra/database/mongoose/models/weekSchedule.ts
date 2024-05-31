import { WeekScheduleInterface } from "@/restaurant/domain/entities/WeekSchedule";
import { DayInterface } from "@/restaurant/domain/valueObj/Day";
import { WeekInterface } from "@/restaurant/domain/valueObj/Week";
import { Schema, model, Document } from "mongoose";

/**
 * Interface representing the structure of a week schedule.
 *
 * @interface
 */
interface IWeekSchedule extends WeekScheduleInterface, Document {
  id: String;
}

const WeekSchema = new Schema<WeekInterface>({
  start: { type: Date },
  end: { type: Date }
});

const WeekScheduleSchema = new Schema<IWeekSchedule>({
  period: { type: WeekSchema },
  weekDays: { type: Array<DayInterface>() },
});

const WeekScheduleModel = model("WeekScheduleSchema", WeekScheduleSchema);

export default WeekScheduleModel;
