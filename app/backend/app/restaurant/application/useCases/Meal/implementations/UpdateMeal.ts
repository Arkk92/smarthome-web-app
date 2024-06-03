import { IUpdateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/UpdateMeal";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { IMealsRepository } from "../../../repositories/Meal";
import { IUpdateMealUseCase } from "../UpdateMeal";
import { IMealInRequestDTO } from "@/restaurant/domain/dtos/Meal/MealIn";
import { MealErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";

/**
 * Use case for retrieving all meals.
 *
 * @class
 * @implements {IUpdateMealUseCase}
 */
export class UpdateMealUseCase implements IUpdateMealUseCase {
  /**
   * Creates an instance of UpdateMealUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the update meal use case.
   *
   * @async
   * @param {String} id - The id of the meal to update
   * @param {IUpdateMealRequestDTO} data - The data for updating a meal.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(id: string, data: IUpdateMealRequestDTO): Promise<ResponseDTO> {
    try {
      const mealAlreadyExists = (await this.mealRepository.findById(
        id
      )) as IMealInRequestDTO | null;
      if (!mealAlreadyExists) {
        return { data: { error: MealErrorType.MealNotFound }, success: false };
      }
      const updatedMeal = await this.mealRepository.update(
        mealAlreadyExists,
        data
      );
      if (!updatedMeal) {
        return { data: { error: MealErrorType.MealNotFound }, success: false };
      }
      return { data: updatedMeal, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
