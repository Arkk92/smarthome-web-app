import { mongooseClient } from "@/restaurant/infra/database/connect";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { WeekScheduleRepository } from "@/restaurant/infra/repositories/WeekSchedule";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";
import { CreateWeekScheduleUseCase } from "../implementations/CreateWeekSchedule";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { CreateMealUseCase } from "../../Meal/implementations/CreateMeal";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { GetAllMealUseCase } from "../../Meal/implementations/GetAllMeal";
import { Week } from "@/restaurant/domain/valueObj/Week";
import { GetWeekScheduleByDateUseCase } from "../implementations/GetWeekScheduleByDate";
import { GetAllWeekScheduleUseCase } from "../implementations/GetAllWeekSchedule";
import { MealInterface } from "@/restaurant/domain/entities/Meal";
import mealDataset from "../implementations/helpers/__tests__/datasets/mealschemas";

describe("Get Week Schedule by Date Use Case", () => {
  let weekScheduleRepository: WeekScheduleRepository;
  let mealRepository: MealRepository;
  beforeAll(async () => {
    let response: ResponseDTO;
    weekScheduleRepository = new WeekScheduleRepository(mongooseClient);
    mealRepository = new MealRepository(mongooseClient);

    const weekMeals: MealInterface[] = mealDataset;
    const createMeal = new CreateMealUseCase(mealRepository);
    for (var meal of weekMeals) {
      response = await createMeal.execute(meal);
      expect(Boolean(response.success)).toBe(true);
    }
    // Ensure all meals are ready
    const getMeal = new GetAllMealUseCase(mealRepository);
    response = await getMeal.execute();
    expect(Boolean(response.success)).toBe(true);
    expect(response.data.body).toHaveLength(weekMeals.length);
  });

  it("should retrieve a weekSchedule by it's date ", async () => {
    // Creates some week schedule
    const requestCreateList: ICreateWeekScheduleRequestDTO[] = [
      {
        period: {
          start: new Date("03-06-2024"),
          end: new Date("10-06-2024"),
        } as Week,
        weekDays: [],
      },
      {
        period: {
          start: new Date("10-06-2024"),
          end: new Date("17-06-2024"),
        } as Week,
        weekDays: [],
      },
    ];
    const mealConstrains: IMealInWithConstrainsDTO = {
      babyAllowed: false,
      season: Seasons.Any,
    };
    const createWeekSchedule = new CreateWeekScheduleUseCase(
      weekScheduleRepository,
      mealRepository
    );

    let response = await createWeekSchedule.execute(
      mealConstrains,
      requestCreateList[0]
    );
    expect(Boolean(response.success)).toBe(true);

    // retrieve it
    const page = 0;
    const getWeekSchedule = new GetAllWeekScheduleUseCase(
      weekScheduleRepository
    );
    const getResponse = await getWeekSchedule.execute(page);
    expect(getResponse.success).toBe(true);
    expect(getResponse.data).toHaveLength(1);
  });
});
