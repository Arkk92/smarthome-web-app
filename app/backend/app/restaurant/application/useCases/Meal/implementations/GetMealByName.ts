import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { IGetMealByNameUseCase } from "../GetMealByName";
import { MealErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";

/**
 * Use case for retrieving a meal by name.
 *
 * @class
 * @implements {IGetMealByNameUseCase}
 */
export class GetMealByNameUseCase implements IGetMealByNameUseCase {
  /**
   * Creates an instance of GetMealByNameUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the get all meals use case.
   *
   * @async
   * @param {string} name - The meal name
   * @returns {Promise<ResponseDTO>} The response data containing meal information.
   */
  async execute(name: string): Promise<ResponseDTO> {
    try {
      const meal = await this.mealRepository.findByName(name);
      if (!meal) {
        return { data: { error: MealErrorType.MealNotFound }, success: false };
      }

      return { data: meal, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
