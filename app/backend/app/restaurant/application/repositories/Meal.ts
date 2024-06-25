import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { IMealInRequestDTO } from "@/restaurant/domain/dtos/Meal/MealIn";
import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";
import { IMealOutRequestDTO } from "@/restaurant/domain/dtos/Meal/MealOut";
import { IUpdateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/UpdateMeal";
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";

/**
 * Interface for the repository handling meal data.
 *
 * @interface
 */
export interface IMealsRepository {
  /**
   * Creates a new meal with the provided data.
   *
   * @async
   * @param {ICreateMealRequestDTO} data - The meal data to be created.
   * @returns {Promise<IMealOutRequestDTO>} The created meal data.
   */
  create(data: ICreateMealRequestDTO): Promise<IMealOutRequestDTO>;

  /**
   * Finds a meal by their name.
   *
   * @async
   * @param {string} name - The name address of the meal.
   * @returns {Promise<IMealInRequestDTO | unknown>} The found meal data, or undefined if not found.
   */
  findByName(name: String): Promise<IMealInRequestDTO | unknown>;

  /**
   * Finds a meal by their ID.
   *
   * @async
   * @param {string} id - The ID of the meal.
   * @returns {Promise<IMealInRequestDTO | unknown>} The found meal data, or undefined if not found.
   */
  findById(id: string): Promise<IMealInRequestDTO | unknown>;

  /**
   * Finds a meal by season and baby allowance.
   *
   * @async
   * @param {IMealInWithConstrainsDTO} constraints - constrains the meal shall have.
   * @returns {Promise<Array<IMealInRequestDTO> | unknown>} The found meal list or null.
   */
  findWithConstrains(constraints: IMealInWithConstrainsDTO): Promise<Array<IMealInRequestDTO> | unknown>

  /**
   * Retrieves a paginated list of meals.
   *
   * @async
   * @returns {Promise<PaginationDTO>} The paginated list of meals.
   */
  findAll(): Promise<PaginationDTO>;

  /**
   * Updates the meal data with the provided information.
   *
   * @async
   * @param {IMealOutRequestDTO} meal - The meal to be updated.
   * @param {IUpdateMealRequestDTO} data - The updated meal data.
   * @returns {Promise<IMealOutRequestDTO>} The updated meal data.
   */
  update(
    meal: IMealOutRequestDTO,
    data: IUpdateMealRequestDTO
  ): Promise<IMealOutRequestDTO | unknown>;

  /**
   * Deletes a meal by their ID.
   *
   * @async
   * @param {string} id - The ID of the meal to be deleted.
   * @returns {Promise<void>} A promise that resolves when the meal is deleted.
   */
  delete(id: string): Promise<void>;
}
