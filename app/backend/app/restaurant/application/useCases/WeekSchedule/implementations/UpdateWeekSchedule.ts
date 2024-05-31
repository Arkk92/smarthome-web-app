import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { IUpdateWeekScheduleUseCase } from "../UpdateWeekSchedule";
import { IUpdateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/UpdateWeekSchedule";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { IWeekScheduleInRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleIn";
import { WeekScheduleErrorType } from "@/restaurant/domain/enums/meal/ErrorType";


/**
 * Use case for retrieving all weekSchedules.
 *
 * @class
 * @implements {IUpdateWeekScheduleUseCase}
 */
export class UpdateWeekScheduleUseCase implements IUpdateWeekScheduleUseCase {
  /**
   * Creates an instance of UpdateWeekScheduleUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   */
  constructor(private weekScheduleRepository: IWeekSchedulesRepository) {}

  /**
   * Executes the update weekSchedule use case.
   *
   * @async
   * @param {String} id - The id of the weekSchedule to update
   * @param {IUpdateWeekScheduleRequestDTO} data - The data for updating a weekSchedule.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(id: string, data: IUpdateWeekScheduleRequestDTO): Promise<ResponseDTO> {
    try {
      const weekScheduleAlreadyExists = (await this.weekScheduleRepository.findById(
        id
      )) as IWeekScheduleInRequestDTO | null;
      if (!weekScheduleAlreadyExists) {
        return { data: { error: WeekScheduleErrorType.WeekScheduleNotFound }, success: false };
      }
      const updatedWeekSchedule = await this.weekScheduleRepository.update(
        weekScheduleAlreadyExists,
        data
      );
      if (!updatedWeekSchedule) {
        return { data: { error: WeekScheduleErrorType.WeekScheduleNotFound }, success: false };
      }
      return { data: updatedWeekSchedule, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
