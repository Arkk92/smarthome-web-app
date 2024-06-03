import { IWeekSchedulesRepository } from '@/restaurant/application/repositories/WeekSchedule'
import { IGetWeekScheduleByIdUseCase } from '../GetWeekScheduleById'
import { ResponseDTO } from '@/restaurant/domain/dtos/Response'
import { WeekScheduleErrorType } from '@/restaurant/domain/enums/meal/ErrorType'

/**
 * Use case for retrieving a weekSchedule by id.
 *
 * @class
 * @implements {IGetWeekScheduleByIdUseCase}
 */
export class GetWeekScheduleByIdUseCase implements IGetWeekScheduleByIdUseCase {
  /**
   * Creates an instance of GetWeekScheduleByIdUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   */
  constructor(private weekScheduleRepository: IWeekSchedulesRepository) {}

  /**
   * Executes the get all weekSchedules use case.
   *
   * @async
   * @param {string} id - The weekSchedule id 
   * @returns {Promise<ResponseDTO>} The response data containing weekSchedule information.
   */
  async execute(id: string): Promise<ResponseDTO> {
    try {
      const weekSchedule = await this.weekScheduleRepository.findById(id)

      if (!weekSchedule) {
        return { data: { error: WeekScheduleErrorType.WeekScheduleNotFound }, success: false }
      }

      return { data: weekSchedule, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}