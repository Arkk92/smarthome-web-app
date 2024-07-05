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
import { UpdateWeekScheduleUseCase } from "../implementations/UpdateWeekSchedule";
import { MealInterface } from "@/restaurant/domain/entities/Meal";
import mealDataset from "../implementations/helpers/__tests__/datasets/mealschemas";

describe("Update Week Schedule Use Case", () => {
  let weekScheduleRepository: WeekScheduleRepository;
  let mealRepository: MealRepository;
  beforeAll(async () => {
    let response: ResponseDTO;
    weekScheduleRepository = new WeekScheduleRepository(mongooseClient);
    mealRepository = new MealRepository(mongooseClient);

    const weekMeals: MealInterface[] = mealDataset;
    
    const createMeal = new CreateMealUseCase(mealRepository);
    for( var meal of weekMeals){
      response = await createMeal.execute(meal);
      expect(Boolean(response.success)).toBe(true);
    }
    // Ensure all meals are ready
    const getMeal = new GetAllMealUseCase(mealRepository);
    response = await getMeal.execute();
    expect(Boolean(response.success)).toBe(true);
    expect(response.data.body).toHaveLength(weekMeals.length)

    
  });

  it("should update a weekSchedule by it's id ", async () => {

    
    // Creates a week schedule
    const requestCreate: ICreateWeekScheduleRequestDTO = {
      period: {
        start: new Date("06-03-2024"),
        end: new Date("06-10-2024"),
      } as Week,
      weekDays: [],
    };
    const mealConstrains: IMealInWithConstrainsDTO = {
      babyAllowed: false,
      season: Seasons.Any,
    }
    const createWeekSchedule = new CreateWeekScheduleUseCase(weekScheduleRepository, mealRepository);
    const response = await createWeekSchedule.execute(mealConstrains, requestCreate);
    expect(Boolean(response.success)).toBe(true);
    expect(response.data.weekDays).toHaveLength(7)

    // update it
    const updateWeekSchedule = new UpdateWeekScheduleUseCase(weekScheduleRepository);
    const updateResponse = await updateWeekSchedule.execute(response.data._id.toString(), {
      period: {
        start: new Date("06-10-2024"),
        end: new Date("06-17-2024"),
      } as Week
    });
    expect(updateResponse.success).toBe(true);
    expect(updateResponse.data.period).toMatchObject({
      start: new Date("06-10-2024"),
      end: new Date("06-17-2024"),
    });
    
  });
});
