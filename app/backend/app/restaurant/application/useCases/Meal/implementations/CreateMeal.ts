import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";

import { Meal } from "@/restaurant/domain/entities/Meal";
import { ICreateMealUseCase } from "../CreateMeal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { MealErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";


/**
 * Use case for creating a new meal.
 *
 * @class
 * @implements {ICreateMealUseCase}
 */
export class CreateMealUseCase implements ICreateMealUseCase {
  /**
   * Creates an instance of CreateMealUseCase.
   *
   * @constructor
   * @param {IMealsRepository} mealRepository - The repository for meal data.
   */
  constructor(private mealRepository: IMealsRepository) {}

  /**
   * Executes the create meal use case.
   *
   * @async
   * @param {ICreateMealRequestDTO} request - The meal creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(request: ICreateMealRequestDTO): Promise<ResponseDTO> {
    try {
      const mealEntity = Meal.create(request);

      const mealAlreadyExists = await this.mealRepository.findByName(
        mealEntity.name
      );

      if (mealAlreadyExists) {
        return {
          data: { error: MealErrorType.MealAlreadyExists },
          success: false,
        };
      }

      const meal = await this.mealRepository.create({
        name: mealEntity.name,
        mealTime: mealEntity.mealTime,
        ingridientList: mealEntity.ingridientList,
        isVegetarian: mealEntity.isVegetarian,
        season: mealEntity.season,
        babyAllowed: mealEntity.babyAllowed,
        recipe: mealEntity.recipe,
        batchMealCount: mealEntity.batchMealCount
      });

      return { data: meal, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
