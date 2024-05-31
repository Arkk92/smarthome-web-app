import { MealInterface } from "../entities/Meal";
import { WeekDays } from "../enums/weekSchedule/WeekDays";

/**
 * Type representing the properties needed to create an Day instance.
 *
 * @interface
 */
export interface DayInterface {
  name: WeekDays;
  breakfast: MealInterface;
  lunch: MealInterface;
  dinner: MealInterface;
};

/**
 * Class representing a day.
 *
 * @class
 */
export class Day implements DayInterface{
  private _name: WeekDays;
  private _breakfast: MealInterface;
  private _lunch: MealInterface;
  private _dinner: MealInterface;

  public get dinner(): MealInterface {
    return this._dinner;
  }
  public set dinner(value: MealInterface) {
    this._dinner = value;
  }
  public get name(): WeekDays {
    return this._name;
  }
  public set name(value: WeekDays) {
    this._name = value;
  }
  public get breakfast(): MealInterface {
    return this._breakfast;
  }
  public set breakfast(value: MealInterface) {
    this._breakfast = value;
  }
  public get lunch(): MealInterface {
    return this._lunch;
  }
  public set lunch(value: MealInterface) {
    this._lunch = value;
  }

  /**
   * Creates an instance of the day class.
   *
   * @constructor
   * @param {DayInterface} props - The properties for creating a day instance.
   * @throws {Error} Throws an error if the day is invalid.
   */
  constructor(props: DayInterface) {
    this._name = props.name;
    this._breakfast = props.breakfast;
    this._lunch = props.lunch;
    this._dinner = props.dinner;
  }
  /**
   * Creates a new day instance based on the provided data.
   *
   * @static
   * @param {DayInterface} data - The data to create a day.
   * @returns {Day} The created day instance.
   */
  static create(data: DayInterface): Day {
    return new Day(data);
  }
}

export default MealInterface;
