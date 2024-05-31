import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { WeekScheduleErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";
import { IGetAllWeekScheduleUseCase } from "../GetAllWeekSchedule";

/**
 * Use case for retrieving all weekSchedules.
 *
 * @class
 * @implements {IGetAllWeekScheduleUseCase}
 */
export class GetAllWeekScheduleUseCase implements IGetAllWeekScheduleUseCase {
  /**
   * Creates an instance of GetAllWeekScheduleUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   */
  constructor(private weekScheduleRepository: IWeekSchedulesRepository) {}

  /**
   * Executes the get all weekSchedules use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing weekSchedule information.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const weekSchedules = await this.weekScheduleRepository.findAll(page);

      if (weekSchedules.total === 0) {
        return { data: { error: WeekScheduleErrorType.WeekScheduleNotFound }, success: false };
      }

      return { data: weekSchedules, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
