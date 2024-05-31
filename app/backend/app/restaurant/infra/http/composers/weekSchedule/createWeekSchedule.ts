import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { ICreateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/CreateWeekSchedule";
import { CreateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/implementations/CreateWeekSchedule";
import { IController } from "@/restaurant/infra/controllers/IController";
import { CreateWeekScheduleController } from "@/restaurant/infra/controllers/WeekSchedule/CreateWeekSchedule";
import { mongooseClient } from "@/restaurant/infra/database/connect";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { WeekScheduleRepository } from "@/restaurant/infra/repositories/WeekSchedule";

/**
 * Composer function for creating and configuring the components required for weekSchedule creation.
 *
 * @function
 * @returns {IController} The configured weekSchedule creation controller.
 */
export function createWeekScheduleComposer(): IController {
  const weekScheduleRepository: IWeekSchedulesRepository = new WeekScheduleRepository(
    mongooseClient
  );
  const mealRepository: IMealsRepository = new MealRepository(
    mongooseClient
  );
  const useCase: ICreateWeekScheduleUseCase = new CreateWeekScheduleUseCase(
    weekScheduleRepository,
    mealRepository
  );
  const controller: IController = new CreateWeekScheduleController(useCase);
  return controller;
}
