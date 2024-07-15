import type { ResponseDTO } from "../../domain/dtos/Response";
import type { IngridientInterface } from "../../domain/entities/Ingridient";
import type { WeekScheduleInterface } from "../../domain/entities/WeekSchedule";

/**
 * Interface for the use case of generating the list of ingredients for a week.
 *
 * @interface
 */
export interface IGenerateListOfIngredientsUseCase {
  /**
   * Executes the generate list of ingredients use case.
   *
   * @async
   * @param {WeekScheduleInterface} data - The week data for generating the list.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: WeekScheduleInterface): Promise<ResponseDTO>;
}

export type IngredientList = {ingredient: IngridientInterface, quantity: number}