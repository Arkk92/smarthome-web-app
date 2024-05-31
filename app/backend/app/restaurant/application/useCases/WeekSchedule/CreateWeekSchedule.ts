import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";

/**
 * Interface for the use case of creating a new weekSchedule.
 *
 * @interface
 */
export interface ICreateWeekScheduleUseCase {
  /**
   * Executes the create weekSchedule use case.
   *
   * @async
   * @param {IMealInWithConstrainsDTO} mealConstrains - The meal constrains.
   * @param {ICreateWeekScheduleRequestDTO} request - The weekSchedule creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(
    mealConstrains: IMealInWithConstrainsDTO,
    request: ICreateWeekScheduleRequestDTO
  ): Promise<ResponseDTO>;
}
