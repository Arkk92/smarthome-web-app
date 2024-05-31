import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { IGetAllMealUseCase } from "../GetAllMeal";
import { MealErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";

/**
 * Use case for retrieving all meals.
 *
 * @class
 * @implements {IGetAllMealUseCase}
 */
export class GetAllMealUseCase implements IGetAllMealUseCase {
  /**
   * Creates an instance of GetAllMealUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the get all meals use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing meal information.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const meals = await this.mealRepository.findAll(page);

      if (!meals.total || meals.total === 0) {
        return { data: { error: MealErrorType.MealNotFound }, success: false };
      }

      return { data: meals, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
