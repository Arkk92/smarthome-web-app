import { IController } from "@/restaurant/infra/controllers/IController";
import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { WeekScheduleRepository } from "@/restaurant/infra/repositories/WeekSchedule";
import { IUpdateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/UpdateWeekSchedule";
import { UpdateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/UpdateWeekSchedule";
import { UpdateWeekScheduleController } from "@/restaurant/infra/controllers/WeekSchedule/UpdateWeekSchedule";

/**
 * Composer function for creating and configuring the components required for weekSchedule creation.
 *
 * @function
 * @returns {IController} The configured weekSchedule creation controller.
 */
export function updateWeekScheduleComposer(): IController {
  const repository: IWeekSchedulesRepository = new WeekScheduleRepository(mongooseClient);
  const useCase: IUpdateWeekScheduleUseCase = new UpdateWeekScheduleUseCase(repository);
  const controller: IController = new UpdateWeekScheduleController(useCase);
  return controller;
}
