
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";
import { IUpdateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/UpdateWeekSchedule";
import { IWeekScheduleInRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleIn";
import { IWeekScheduleOutRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleOut";

/**
 * Interface for the repository handling week schedule data.
 *
 * @interface
 */
export interface IWeekSchedulesRepository {
  /**
   * Creates a new week schedule with the provided data.
   *
   * @async
   * @param {ICreateWeekScheduleRequestDTO} data - The week schedule data to be created.
   * @returns {Promise<IWeekScheduleOutRequestDTO>} The created week schedule data.
   */
  create(data: ICreateWeekScheduleRequestDTO): Promise<IWeekScheduleOutRequestDTO>;

  /**
   * Finds a week schedule by their date.
   *
   * @async
   * @param {Date} date - The date of the week schedule.
   * @returns {Promise<IWeekScheduleInRequestDTO | unknown>} The found week schedule data, or undefined if not found.
   */
  findByDate(date: Date): Promise<IWeekScheduleInRequestDTO | unknown>;

  /**
   * Finds a week schedule by their ID.
   *
   * @async
   * @param {string} id - The ID of the week schedule.
   * @returns {Promise<IWeekScheduleInRequestDTO | unknown>} The found week schedule data, or undefined if not found.
   */
  findById(id: string): Promise<IWeekScheduleInRequestDTO | unknown>;

  /**
   * Retrieves a paginated list of week schedules.
   *
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated list of week schedules.
   */
  findAll(pageNumber: Number): Promise<PaginationDTO>;

  /**
   * Updates the week schedule data with the provided information.
   *
   * @async
   * @param {IWeekScheduleOutRequestDTO} week schedule - The week schedule to be updated.
   * @param {IUpdateWeekScheduleRequestDTO} data - The updated week schedule data.
   * @returns {Promise<IWeekScheduleOutRequestDTO>} The updated week schedule data.
   */
  update(
    weekSchedule: IWeekScheduleOutRequestDTO,
    data: IUpdateWeekScheduleRequestDTO
  ): Promise<IWeekScheduleOutRequestDTO | unknown>;

  /**
   * Deletes a week schedule by their ID.
   *
   * @async
   * @param {string} id - The ID of the week schedule to be deleted.
   * @returns {Promise<void>} A promise that resolves when the week schedule is deleted.
   */
  delete(id: string): Promise<void>;
}
