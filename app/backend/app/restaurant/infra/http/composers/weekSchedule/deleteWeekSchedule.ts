import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { IDeleteWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/DeleteWeekSchedule";
import { DeleteWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/DeleteWeekSchedule";
import { IController } from "@/restaurant/infra/controllers/IController";
import { DeleteWeekScheduleController } from "@/restaurant/infra/controllers/WeekSchedule/DeleteWeekSchedule";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { WeekScheduleRepository } from "@/restaurant/infra/repositories/WeekSchedule";

/**
 * Composer function for creating and configuring the components required for weekSchedule deletion.
 *
 * @function
 * @returns {IController} The configured weekSchedule deletion controller.
 */
export function deleteWeekScheduleComposer(): IController {
  const repository: IWeekSchedulesRepository = new WeekScheduleRepository(mongooseClient);
  const useCase: IDeleteWeekScheduleUseCase = new DeleteWeekScheduleUseCase(repository);
  const controller: IController = new DeleteWeekScheduleController(useCase);
  return controller;
}
