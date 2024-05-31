import { WeekErrorType } from "../enums/week/ErrorType";

/**
 * Type representing the properties needed to create an Week instance.
 *
 * @interface
 */
export interface WeekInterface {
  start: Date;
  end: Date;
};

/**
 * Class representing a week period.
 *
 * @class
 */
export class Week implements WeekInterface{
  private _start: Date;
  private _end: Date;

  /**
   * Getter for the start date.
   *
   * @readonly
   * @returns {Date} The start date.
   */
  public get start(): Date {
    return this._start;
  }

  /**
   * Getter for the end date.
   *
   * @readonly
   * @returns {Date} The end date.
   */
  public get end(): Date {
    return this._end;
  }

  /**
   * Creates an instance of the week class.
   *
   * @constructor
   * @param {WeekInterface} props - The properties for creating a week instance.
   * @throws {Error} Throws an error if the week period is invalid.
   */
  constructor(props: WeekInterface) {
    if (!isOneWeekApart(props.start, props.end)) {
      throw new Error(WeekErrorType.InvalidWeek);
    }
    this._start = props.start;
    this._end = props.end;
  }
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isOneWeekApart(date1: Date, date2: Date): boolean {
  const normalizedDate1 = normalizeDate(date1);
  const normalizedDate2 = normalizeDate(date2);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysInWeek = 7;

  const diffInMilliseconds = Math.abs(
    normalizedDate1.getTime() - normalizedDate2.getTime()
  );
  const diffInDays = diffInMilliseconds / millisecondsPerDay;

  return diffInDays === daysInWeek;
}
