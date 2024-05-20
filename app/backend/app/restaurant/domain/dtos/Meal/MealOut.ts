import { ICreateMealRequestDTO } from "./CreateMeal";

/**
 * Data Transfer Object (DTO) representing the output meal data.
 *
 * @interface
 */
export interface IMealOutRequestDTO extends ICreateMealRequestDTO {
  /**
   * The id of the meal.
   */
  _id: String;
  /**
   * The optional creation date of the meal.
   */
  createdAt?: Date;
}
