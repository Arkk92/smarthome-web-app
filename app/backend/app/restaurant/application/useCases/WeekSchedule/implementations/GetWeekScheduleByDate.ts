import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { WeekScheduleErrorType } from "@/restaurant/domain/enums/meal/ErrorType";
import { IGetWeekScheduleByDateUseCase } from "../GetWeekScheduleByDate";

/**
 * Use case for retrieving a weekSchedule by date.
 *
 * @class
 * @implements {IGetWeekScheduleByDateUseCase}
 */
export class GetWeekScheduleByDateUseCase implements IGetWeekScheduleByDateUseCase {
  /**
   * Creates an instance of GetWeekScheduleByDateUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   */
  constructor(private weekScheduleRepository: IWeekSchedulesRepository) {}

  /**
   * Executes the get all weekSchedules use case.
   *
   * @async
   * @param {Date} date - The weekSchedule date
   * @returns {Promise<ResponseDTO>} The response data containing weekSchedule information.
   */
  async execute(date: Date): Promise<ResponseDTO> {
    try {
      const weekSchedule = await this.weekScheduleRepository.findByDate(date);
      if (!weekSchedule) {
        return { data: { error: WeekScheduleErrorType.WeekScheduleNotFound }, success: false };
      }

      return { data: weekSchedule, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
