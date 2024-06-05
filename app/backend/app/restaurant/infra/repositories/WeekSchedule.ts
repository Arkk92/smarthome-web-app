import { IWeekScheduleOutRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleOut";
import MongooseClient from "../database/mongoose/MongooseClient";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";
import WeekScheduleModel from "../database/mongoose/models/weekSchedule";
import { IWeekScheduleInRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleIn";
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";
import { IUpdateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/UpdateWeekSchedule";
import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";

/**
 * Mongoo implementation of the weekSchedule repository.
 *
 * @class
 * @implements {IWeekSchedulesRepository}
 */
export class WeekScheduleRepository implements IWeekSchedulesRepository {
  /**
   * Creates an instance of WeekScheduleRepository.
   *
   * @constructor
   * @param {MongooClient} mongoose - The Mongoo client instance.
   */
  constructor(private mongoose: MongooseClient) {}

  /**
   * Creates a new weekSchedule.
   *
   * @async
   * @param {ICreateWeekScheduleRequestDTO} data - The weekSchedule data.
   * @returns {Promise<IWeekScheduleOutRequestDTO>} The created weekSchedule.
   */
  async create(data: ICreateWeekScheduleRequestDTO): Promise<IWeekScheduleOutRequestDTO> {
    const weekSchedule = await WeekScheduleModel.create({'period': data.period, 'weekDays': data.weekDays});
    return weekSchedule.toObject();
  }

  /**
   * Finds a weekSchedule by date.
   *
   * @async
   * @param {Date} date - The date to search for.
   * @returns {Promise<IWeekScheduleInRequestDTO | unknown>} The found weekSchedule or undefined.
   */
  async findByDate(date: Date): Promise<IWeekScheduleInRequestDTO | unknown> {
    const weekSchedule = await WeekScheduleModel.findOne({ 'period.start': date }).exec();
    return weekSchedule;
  }

  /**
   * Finds a weekSchedule by ID.
   *
   * @async
   * @param {string} id - The ID of the weekSchedule to find.
   * @returns {Promise<IWeekScheduleInRequestDTO | unknown>} The found weekSchedule or null.
   */
  async findById(id: string): Promise<IWeekScheduleInRequestDTO | unknown> {
    const weekSchedule = await WeekScheduleModel.findById(id).exec();
    return weekSchedule;
  }

  /**
   * Retrieves a paginated list of weekSchedules.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of weekSchedules.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4;
    const weekSchedules = await WeekScheduleModel.find({})
      .limit(Math.ceil((pageNumber - 1) * perPage))
      .sort({ name: "asc" })
      .exec();

    const total = await WeekScheduleModel.countDocuments().exec();

    return {
      body: weekSchedules,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    };
  }

  /**
   * Updates a weekSchedule with new data.
   *
   * @async
   * @param {IWeekScheduleOutRequestDTO} weekSchedule - The weekSchedule to update.
   * @param {IUpdateWeekScheduleRequestDTO} data - The updated weekSchedule data.
   * @returns {Promise<IWeekScheduleOutRequestDTO | unknown>} The updated weekSchedule.
   */
  async update(
    weekSchedule: IWeekScheduleOutRequestDTO,
    data: IUpdateWeekScheduleRequestDTO
  ): Promise<IWeekScheduleOutRequestDTO | unknown> {
    const weekScheduleUpdated = await WeekScheduleModel.findOneAndUpdate(
      { _id:  weekSchedule.id },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
    return weekScheduleUpdated;
  }

  /**
   * Deletes a weekSchedule by ID.
   *
   * @async
   * @param {string} id - The ID of the weekSchedule to delete.
   * @returns {Promise<void>} A Promise that resolves once the weekSchedule is deleted.
   */
  async delete(id: string): Promise<void> {
    await WeekScheduleModel.findOneAndDelete({ _id: id });
  }
}
