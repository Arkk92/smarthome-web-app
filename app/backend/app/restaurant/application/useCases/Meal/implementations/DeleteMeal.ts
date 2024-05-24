import { IMealsRepository } from "@/restaurant/application/repositories/Meal"
import { IDeleteMealUseCase } from "../DeleteMeal"
import { MealErrorType } from "@/restaurant/domain/enums/meal/ErrorType"
import { MealSuccessType } from "@/restaurant/domain/enums/meal/SuccessType"

/**
 * Use case for deleting a meal.
 *
 * @class
 * @implements {IDeleteMealUseCase}
 */
export class DeleteMealUseCase implements IDeleteMealUseCase {
  /**
   * Creates an instance of DeleteMealUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the delete meal use case.
   *
   * @async
   * @param {string} mealId - The ID of the meal to be deleted.
   * @returns {Promise<{ data: { error?: MealErrorType | MealSuccessType }, success: boolean }>} The response data.
   */
  async execute(mealId: string): Promise<{
    data: { error?: MealErrorType | MealSuccessType }
    success: boolean
  }> {
    try {
      const mealAlreadyExists = await this.mealRepository.findById(mealId)

      if (!mealAlreadyExists) {
        return {
          data: { error: MealErrorType.MealDoesNotExist },
          success: false,
        }
      }

      await this.mealRepository.delete(mealId)
      return { data: { error: MealSuccessType.MealDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}