import { ICreateWeekScheduleRequestDTO } from "../dtos/WeekSchedule/CreateWeekSchedule";
import { DayInterface } from "../valueObj/Day";
import { Week } from "../valueObj/Week";


/**
 * Interface representing the structure of a weekSchedule.
 *
 * @interface
 */
export interface WeekScheduleInterface {
  id?: String;
  period: Week;
  weekDays: Array<DayInterface>;
}

/**
 * Class representing a weekSchedule.
 *
 * @class
 */
export class WeekSchedule implements WeekScheduleInterface {
  private _id?: String;
  private _period: Week;
  private _weekDays: Array<DayInterface>;
  
  public get period(): Week {
    return this._period;
  }
  public set period(value: Week) {
    this._period = value;
  }
  public get weekDays(): Array<DayInterface> {
    return this._weekDays;
  }
  public set weekDays(value: Array<DayInterface>) {
    this._weekDays = value;
  }

  /**
   * Creates an instance of WeekSchedule.
   *
   * @constructor
   * @param {WeekScheduleInterface} props - The properties of the weekSchedule.
   */
  constructor(props: WeekScheduleInterface) {
    this._id = props.id;
    this._period = props.period;
    this._weekDays = props.weekDays;
  }

  /**
   * Creates a new weekSchedule instance based on the provided data.
   *
   * @static
   * @param {ICreateWeekScheduleRequestDTO} data - The data to create a weekSchedule.
   * @returns {WeekSchedule} The created weekSchedule instance.
   */
  static create(data: ICreateWeekScheduleRequestDTO): WeekSchedule {
    return new WeekSchedule(data);
  }

  static getEntityKeys(): Array<string> {
    const dateStart = new Date();
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 7);
    const week = new Week({start: dateStart, end: dateEnd})
    const instance:  WeekScheduleInterface = {
      id: "",
      period: week,
      weekDays: []
    }
    return Object.keys(instance).map(key => key.trim()) as Array<string>;
  }

  
}
