import { ICreateMealRequestDTO } from "./CreateMeal";

/**
 * Data Transfer Object (DTO) representing the input meal data.
 *
 * @interface
 */
export interface IMealInRequestDTO extends ICreateMealRequestDTO {
  /**
   * The optional creation date of the meal.
   */
  createdAt: Date;
}
