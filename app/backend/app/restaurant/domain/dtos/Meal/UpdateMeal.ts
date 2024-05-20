
import { Ingridient } from "../../entities/Ingridient";
import { MealTime } from "../../enums/meal/MealTime";
import { Seasons } from "../../enums/meal/Seasons";


/**
 * Data Transfer Object (DTO) representing the request to update a meal.
 *
 * @interface
 */
export interface IUpdateMealRequestDTO {
    /**
   * The name of the meal.
   */
    name?: String;
    /**
   * The meal time the meal is for.
   */
    mealTime?: MealTime;
    /**
   * The list of ingridients of the meal.
   */
    ingridientList?: Array<Ingridient>;
    /**
   * Whether the meal is vegetarian.
   */
    isVegetarian?: Boolean;
    /**
   * The season of the meal.
   */
    season?: Seasons;
    /**
   * Whether the meal is allowed for babies.
   */
    babyAllowed?: Boolean;
    /**
   * List of steps to make the meal.
   */
    recipe?: Array<String>;
}