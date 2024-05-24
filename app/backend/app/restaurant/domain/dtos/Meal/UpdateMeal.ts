
import { MealInterface } from "../../entities/Meal";



/**
 * Data Transfer Object (DTO) representing the request to update a meal.
 *
 * @interface
 */
export interface IUpdateMealRequestDTO extends Partial<MealInterface>{
}