import { IController } from "@/restaurant/infra/controllers/IController";
import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { WeekScheduleRepository } from "@/restaurant/infra/repositories/WeekSchedule";
import { GetAllWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/GetAllWeekSchedule";
import { GetAllWeekScheduleController } from "@/restaurant/infra/controllers/WeekSchedule/GetAllWeekSchedule";
import { GetWeekScheduleByIdUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/GetWeekScheduleById";
import { IGetWeekScheduleByIdUseCase } from "@/restaurant/application/useCases/WeekSchedule/GetWeekScheduleById";
import { GetWeekScheduleByIdController } from "@/restaurant/infra/controllers/WeekSchedule/GetWeekScheduleById";
import { IGetAllWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/GetAllWeekSchedule";
import { IGetWeekScheduleByDateUseCase } from "@/restaurant/application/useCases/WeekSchedule/GetWeekScheduleByDate";
import { GetWeekScheduleByDateUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/GetWeekScheduleByDate";
import { GetWeekScheduleByDateController } from "@/restaurant/infra/controllers/WeekSchedule/GetWeekScheduleByDate";

/**
 * Composer function for retrieving weekSchedule information by id.
 *
 * @function
 * @returns {IController} The configured weekSchedule retrieval controller.
 */
export function getWeekScheduleByIdComposer(): IController {
  const repository: IWeekSchedulesRepository = new WeekScheduleRepository(mongooseClient);
  const useCase: IGetWeekScheduleByIdUseCase = new GetWeekScheduleByIdUseCase(repository);
  const controller: IController = new GetWeekScheduleByIdController(useCase);
  return controller;
}

/**
 * Composer function for retrieving weekSchedule information by date.
 *
 * @function
 * @returns {IController} The configured weekSchedule retrieval controller.
 */
export function getWeekScheduleByDateComposer(): IController {
  const repository: IWeekSchedulesRepository = new WeekScheduleRepository(mongooseClient);
  const useCase: IGetWeekScheduleByDateUseCase = new GetWeekScheduleByDateUseCase(repository);
  const controller: IController = new GetWeekScheduleByDateController(useCase);
  return controller;
}

/**
 * Composer function for retrieving all weekSchedules information.
 *
 * @function
 * @returns {IController} The configured weekSchedule retrieval controller.
 */
export function getAllWeekScheduleComposer(): IController {
  const repository: IWeekSchedulesRepository = new WeekScheduleRepository(mongooseClient);
  const useCase: IGetAllWeekScheduleUseCase = new GetAllWeekScheduleUseCase(repository);
  const controller: IController = new GetAllWeekScheduleController(useCase);
  return controller;
}
