import { ICreateMealRequestDTO } from "../dtos/Meal/CreateMeal";
import { IUpdateMealRequestDTO } from "../dtos/Meal/UpdateMeal";
import { MealTime } from "../enums/meal/MealTime";
import { Seasons } from "../enums/meal/Seasons";
import { Ingridient } from "./Ingridient";

/**
 * Interface representing the structure of a meal.
 *
 * @interface
 */
export interface MealInterface {
  id?: String;
  name: String;
  mealTime: MealTime;
  ingridientList: Array<Ingridient>;
  isVegetarian: Boolean;
  season: Seasons;
  babyAllowed: Boolean;
  recipe: Array<String>;
  batchMealCount: Number;
}

/**
 * Class representing a meal.
 *
 * @class
 */
export class Meal implements MealInterface {
  private _id?: String;
  private _name: String;
  private _isVegetarian: Boolean;
  private _season: Seasons;
  private _babyAllowed: Boolean;
  private _recipe: Array<String>;
  private _mealTime: MealTime;
  private _ingridientList: Array<Ingridient>;
  private _batchMealCount: Number;

  /**
   * Creates an instance of User.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the meal.
   */
  constructor(props: MealInterface) {
    this._id = props.id;
    this._name = props.name;
    this._mealTime = props.mealTime;
    this._ingridientList = props.ingridientList;
    this._isVegetarian = props.isVegetarian;
    this._season = props.season;
    this._babyAllowed = props.babyAllowed;
    this._recipe = props.recipe;
    this._batchMealCount = props.batchMealCount;
  }

  /**
   * Creates a new meal instance based on the provided data.
   *
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a meal.
   * @returns {User} The created meal instance.
   */
  static create(data: ICreateMealRequestDTO): Meal {
    return new Meal(data);
  }

  static update(meal: MealInterface, data: IUpdateMealRequestDTO) : MealInterface {
    (Object.keys(data) as (keyof IUpdateMealRequestDTO)[]).forEach(key => {
      if (data[key] !== undefined) {
        (meal as any)[key] = data[key];
      }
    });
    return meal;
  }

  public set name(value: String) {
    this.name = value;
  }

  public get name(): String {
    return this._name;
  }

  public get mealTime(): MealTime {
    return this._mealTime;
  }
  public set mealTime(value: MealTime) {
    this._mealTime = value;
  }

  public get ingridientList(): Array<Ingridient> {
    return this._ingridientList;
  }
  public set ingridientList(value: Array<Ingridient>) {
    this._ingridientList = value;
  }

  public get isVegetarian(): Boolean {
    return this._isVegetarian;
  }
  public set isVegetarian(value: Boolean) {
    this._isVegetarian = value;
  }

  public get season(): Seasons {
    return this._season;
  }
  public set season(value: Seasons) {
    this._season = value;
  }

  public get babyAllowed(): Boolean {
    return this._babyAllowed;
  }
  public set babyAllowed(value: Boolean) {
    this._babyAllowed = value;
  }

  public get recipe(): Array<String> {
    return this._recipe;
  }
  public set recipe(value: Array<String>) {
    this._recipe = value;
  }

  public get id(): String | undefined {
    return this._id;
  }
  public set id(value: String | undefined) {
    this._id = value;
  }

  public get batchMealCount(): Number {
    return this._batchMealCount;
  }
  public set batchMealCount(value: Number) {
    this._batchMealCount = value;
  }
}
