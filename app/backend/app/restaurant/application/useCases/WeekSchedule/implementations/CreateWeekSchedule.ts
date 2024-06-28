import { IWeekSchedulesRepository } from "@/restaurant/application/repositories/WeekSchedule";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { ICreateWeekScheduleUseCase } from "../CreateWeekSchedule";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";
import {
  WeekSchedule,
  WeekScheduleInterface,
} from "@/restaurant/domain/entities/WeekSchedule";
import { WeekScheduleErrorType } from "@/restaurant/domain/enums/meal/ErrorType";
import { IWeekScheduleInRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/WeekScheduleIn";
import {
  CheckedMeals,
  checkMeals,
  fillWeekWithMeals,
  getCheckedMeals,
  getPreviousStartOfWeek,
} from "./helpers/CreateWeekScheduleFunctions";
import { MealInterface } from "@/restaurant/domain/entities/Meal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { DayInterface } from "@/restaurant/domain/valueObj/Day";
import { IMealInRequestDTO } from "@/restaurant/domain/dtos/Meal/MealIn";
import { MealErrorType } from "@/restaurant/domain/enums/weekSchedule/ErrorType";
import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";

/**
 * Use case for creating a new weekSchedule.
 *
 * @class
 * @implements {ICreateWeekScheduleUseCase}
 */
export class CreateWeekScheduleUseCase implements ICreateWeekScheduleUseCase {
  /**
   * Creates an instance of CreateWeekScheduleUseCase.
   *
   * @constructor
   * @param {IWeekSchedulesRepository} weekScheduleRepository - The repository for weekSchedule data.
   * @param {IMealsRepository} weekScheduleRepository - The repository for meals data.
   */
  constructor(
    private weekScheduleRepository: IWeekSchedulesRepository,
    private mealRepository: IMealsRepository
  ) {}

  /**
   * Executes the create weekSchedule use case.
   *
   * @async
   * @param {IMealInWithConstrainsDTO} mealConstrains - The meal constrains.
   * @param {ICreateWeekScheduleRequestDTO} request - The weekSchedule creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    mealConstrains: IMealInWithConstrainsDTO,
    request: ICreateWeekScheduleRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const weekScheduleEntity: WeekScheduleInterface = WeekSchedule.create({
        period: request.period,
        weekDays: [],
      });

      // Check whether there is an Schedule for this week
      const weekScheduleAlreadyExists =
        (await this.weekScheduleRepository.findByDate(
          weekScheduleEntity.period.start
        )) as IWeekScheduleInRequestDTO | null;

      if (weekScheduleAlreadyExists) {
        return {
          data: { error: WeekScheduleErrorType.WeekScheduleAlreadyExists },
          success: false,
        };
      }
      // If no season has been provided set it as Any
      mealConstrains.season =
        mealConstrains.season !== undefined
          ? mealConstrains.season
          : Seasons.Any;

      // Create a new week schedule
      const allMeals = (await this.mealRepository.findWithConstrains(
        mealConstrains
      )) as IMealInRequestDTO[] | null;

      if (!allMeals || allMeals.length == 0) {
        return {
          data: { error: MealErrorType.MealWithConstrainsNotFound },
          success: false,
        };
      }
      const previousWeekStart = getPreviousStartOfWeek(
        weekScheduleEntity.period.start
      );
      const previousWeek = (await this.weekScheduleRepository.findByDate(
        previousWeekStart
      )) as IWeekScheduleInRequestDTO | null;
      try {
        if (!checkMeals(allMeals)) {
          const checkedMeals: CheckedMeals = getCheckedMeals(allMeals);

          return {
            data: {
              error: WeekScheduleErrorType.WeekScheduleNotEnoughMeals,
              breakfast: checkedMeals.breakfast,
              lunch: checkedMeals.lunch,
              dinner: checkedMeals.dinner,
            },
            success: false,
          };
        }
      } catch (error: any) {
        return { data: { error: error.message }, success: false };
      }

      try {
        const weekDays: DayInterface[] = fillWeekWithMeals(
          allMeals,
          mealConstrains.season,
          mealConstrains.babyAllowed,
          previousWeek?.weekDays
        );
        if (weekDays !== undefined) {
          weekScheduleEntity.weekDays = weekDays;
        }
      } catch (error: any) {
        return { data: { error: error.message }, success: false };
      }
      const weekSchedule = await this.weekScheduleRepository.create({
        period: weekScheduleEntity.period,
        weekDays: weekScheduleEntity.weekDays,
      });

      return { data: weekSchedule, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
