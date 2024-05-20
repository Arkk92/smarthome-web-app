import { ICreateMealRequestDTO } from "../dtos/Meal/CreateMeal";
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
}

/**
 * Class representing a meal.
 *
 * @class
 */
export class Meal {
  private _id?: String;
  private _name: String;
  private _isVegetarian: Boolean;
  private _season: Seasons;
  private _babyAllowed: Boolean;
  private _recipe: Array<String>;
  private _mealTime: MealTime;
  private _ingridientList: Array<Ingridient>;

  /**
   * Creates an instance of User.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the meal.
   */
  constructor(props: MealInterface) {
    this._name = props.name;
    this._mealTime = props.mealTime;
    this._ingridientList = props.ingridientList;
    this._isVegetarian = props.isVegetarian;
    this._season = props.season;
    this._babyAllowed = props.babyAllowed;
    this._recipe = props.recipe;
  }

  /**
   * Creates a new meal instance based on the provided data.
   *
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a meal.
   * @returns {User} The created meal instance.
   */
  static create({
    name,
    mealTime,
    ingridientList,
    isVegetarian,
    season,
    babyAllowed,
    recipe,
  }: ICreateMealRequestDTO) {
    return new Meal({
      name,
      mealTime,
      ingridientList,
      isVegetarian,
      season,
      babyAllowed,
      recipe,
    });
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
}