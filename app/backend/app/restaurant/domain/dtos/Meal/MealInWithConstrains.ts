import { Seasons } from "../../enums/meal/Seasons";
import { IMealInRequestDTO } from "./MealIn";

/**
 * Data Transfer Object (DTO) representing the request to update a meal.
 *
 * @interface
 */
export interface IMealInWithConstrainsDTO extends Partial<IMealInRequestDTO> {
    babyAllowed: boolean,
}
