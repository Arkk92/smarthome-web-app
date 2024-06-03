import { IMealsRepository } from '@/restaurant/application/repositories/Meal'
import { IGetMealByIdUseCase } from '../GetMealById'
import { ResponseDTO } from '@/restaurant/domain/dtos/Response'
import { MealErrorType } from '@/restaurant/domain/enums/weekSchedule/ErrorType'


/**
 * Use case for retrieving a meal by id.
 *
 * @class
 * @implements {IGetMealByIdUseCase}
 */
export class GetMealByIdUseCase implements IGetMealByIdUseCase {
  /**
   * Creates an instance of GetMealByIdUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the get all meals use case.
   *
   * @async
   * @param {string} id - The meal id 
   * @returns {Promise<ResponseDTO>} The response data containing meal information.
   */
  async execute(id: string): Promise<ResponseDTO> {
    try {
      const meal = await this.mealRepository.findById(id)

      if (!meal) {
        return { data: { error: MealErrorType.MealNotFound }, success: false }
      }

      return { data: meal, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}