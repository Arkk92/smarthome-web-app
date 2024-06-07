import { mongooseClient } from "@/restaurant/infra/database/connect";
import { CreateMealUseCase } from "../implementations/CreateMeal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";

describe("Create Meal Use Case", () => {
  let mealRepository: IMealsRepository;
  beforeAll(async () => {
    mealRepository = new MealRepository(mongooseClient);
  });

  it("should create a new meal", async () => {
    // Add more assertions as needed
    const request: ICreateMealRequestDTO = {
      name: "Test Meal",
      mealTime: MealTime.Breakfast,
      ingridientList: [
        Ingridient.create({
          name: "Ingredient 1",
          quantity: 1,
          apiUri: "",
          unit: "",
        }),
        Ingridient.create({
          name: "Ingredient 2",
          quantity: 2,
          apiUri: "",
          unit: "",
        }),
      ],
      isVegetarian: true,
      season: Seasons.Any,
      babyAllowed: false,
      recipe: ["Step 1", "Step 2"],
      batchMealCount: 5,
    };
    const createMeal = new CreateMealUseCase(mealRepository);
    const response: ResponseDTO = await createMeal.execute(request);
    expect(Boolean(response.success)).toBe(true);
  });
});
