import { MealInterface } from "../../entities/Meal";

/**
 * Data Transfer Object (DTO) representing the output meal data.
 *
 * @interface
 */
export interface IMealOutRequestDTO extends MealInterface {
  /**
   * The optional creation date of the meal.
   */
  createdAt?: Date;
}
