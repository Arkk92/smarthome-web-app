import { ResponseDTO } from '../../../../domain/dtos/Response'
import { MealErrorType } from '../../../../domain/enums/meal/ErrorType'
import { IMealsRepository } from '../../../repositories/Meal'
import { IGetAllMealUseCase } from '../GetAllMeal'

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
      const meals = await this.mealRepository.findAll(page)

      if (meals.total === 0) {
        return { data: { error: MealErrorType.MealNotFound }, success: false }
      }

      return { data: meals, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}