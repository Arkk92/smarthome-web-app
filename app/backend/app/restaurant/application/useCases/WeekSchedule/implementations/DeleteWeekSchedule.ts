import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule"
import { IDeleteWeekScheduleUseCase } from "../DeleteWeekSchedule"
import { WeekScheduleSuccessType } from "@/restaurant/domain/enums/weekSchedule/SuccessType"
import { WeekScheduleErrorType } from "@/restaurant/domain/enums/meal/ErrorType"

/**
 * Use case for deleting a weekSchedule.
 *
 * @class
 * @implements {IDeleteWeekScheduleUseCase}
 */
export class DeleteWeekScheduleUseCase implements IDeleteWeekScheduleUseCase {
  /**
   * Creates an instance of DeleteWeekScheduleUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   */
  constructor(private weekScheduleRepository: IWeekSchedulesRepository) {}

  /**
   * Executes the delete weekSchedule use case.
   *
   * @async
   * @param {string} weekScheduleId - The ID of the weekSchedule to be deleted.
   * @returns {Promise<{ data: { error?: WeekScheduleErrorType | WeekScheduleSuccessType }, success: boolean }>} The response data.
   */
  async execute(weekScheduleId: string): Promise<{
    data: { error?: WeekScheduleErrorType | WeekScheduleSuccessType }
    success: boolean
  }> {
    try {
      const weekScheduleAlreadyExists = await this.weekScheduleRepository.findById(weekScheduleId)

      if (!weekScheduleAlreadyExists) {
        return {
          data: { error: WeekScheduleErrorType.WeekScheduleDoesNotExist },
          success: false,
        }
      }

      await this.weekScheduleRepository.delete(weekScheduleId)
      return { data: { error: WeekScheduleSuccessType.WeekScheduleDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}