import { MealInterface } from "../entities/Meal";

/**
 * Type representing the properties needed to create an PlannedMeal instance.
 *
 * @interface
 */
type PlannedMealProps = {
  meal: MealInterface;
};

/**
 * Class representing a plannedMeal.
 *
 * @class
 */
export class PlannedMeal {
  private _meal: MealInterface;
  private _skipped: Boolean;


  public get meal(): MealInterface {
    return this._meal;
  }
  public set meal(value: MealInterface) {
    this._meal = value;
  }
  public get skipped(): Boolean {
    return this._skipped;
  }
  public set skipped(value: Boolean) {
    this._skipped = value;
  }

  /**
   * Creates an instance of the plannedMeal class.
   *
   * @constructor
   * @param {PlannedMealProps} props - The properties for creating a plannedMeal instance.
   * @throws {Error} Throws an error if the plannedMeal is invalid.
   */
  constructor(props: PlannedMealProps) {
      this._meal = props.meal;
      this._skipped = false;
  }
}

export default PlannedMeal;
