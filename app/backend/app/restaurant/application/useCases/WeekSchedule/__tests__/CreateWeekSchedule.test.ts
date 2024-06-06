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

describe("Create Week Schedule Use Case", () => {
  let weekScheduleRepository: WeekScheduleRepository;
  let mealRepository: MealRepository;
  beforeAll(async () => {
    let response: ResponseDTO;
    weekScheduleRepository = new WeekScheduleRepository(mongooseClient);
    mealRepository = new MealRepository(mongooseClient);

    const weekMeals: ICreateMealRequestDTO[] = [
      {
        name: "breakfast 1",
        mealTime: MealTime.Breakfast,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "lunch 1",
        mealTime: MealTime.Lunch,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "breakfast 2",
        mealTime: MealTime.Breakfast,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "lunch 2",
        mealTime: MealTime.Lunch,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "dinner 1",
        mealTime: MealTime.Dinner,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
      {
        name: "dinner 2",
        mealTime: MealTime.Dinner,
        ingridientList: [
          Ingridient.create({ name: "Ingredient 1", quantity: 1, apiUri: "", unit: "" }),
          Ingridient.create({ name: "Ingredient 2", quantity: 2, apiUri: "", unit: "" }),
        ],
        isVegetarian: true,
        season: Seasons.Any,
        babyAllowed: false,
        recipe: ["Step 1", "Step 2"],
        batchMealCount: 5,
      },
    ];
    const createMeal = new CreateMealUseCase(mealRepository);
    for( var meal of weekMeals){
      response = await createMeal.execute(meal);
      expect(response.success).toBe(true);
    }
    // Ensure all meals are ready
    const getMeal = new GetAllMealUseCase(mealRepository);
    response = await getMeal.execute(0);
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(weekMeals.length)
  });

  it("should create a new weekSchedule ", async () => {
    
    const request: ICreateWeekScheduleRequestDTO = {
      period: {
        start: new Date("03-06-2024"),
        end: new Date("10-06-2024"),
      } as Week,
      weekDays: [],
    };
    const mealConstrains: IMealInWithConstrainsDTO = {
      babyAllowed: false,
      season: Seasons.Any,
    }
    const createWeekSchedule = new CreateWeekScheduleUseCase(weekScheduleRepository, mealRepository);
    const response = await createWeekSchedule.execute(mealConstrains, request);
    expect(response.success).toBe(true);
    expect(response.data.weekDays).toHaveLength(7)
  });
});
