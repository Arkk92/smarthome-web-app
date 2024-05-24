import { MealInterface } from "../../entities/Meal";

/**
 * Data Transfer Object (DTO) representing the input meal data.
 *
 * @interface
 */
export interface IMealInRequestDTO extends MealInterface {
  /**
   * The optional creation date of the meal.
   */
  createdAt: Date;
}
