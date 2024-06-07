import { mongooseClient } from "@/restaurant/infra/database/connect";
import { CreateMealUseCase } from "../implementations/CreateMeal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { GetMealByNameUseCase } from "../implementations/GetMealByName";

describe("Get Meal by name Use Case", () => {
  let mealRepository: IMealsRepository;
  beforeAll(async () => {
    mealRepository = new MealRepository(mongooseClient);
  });

  it("should retrieve a meal by it's name", async () => {
    // Create some test meals in the database
    const meal1 = {
      name: "Test Meal 1",
      mealTime: "Breakfast",
      ingridientList: [],
      isVegetarian: false,
      season: "Warm",
      babyAllowed: true,
      recipe: ["Step 1"],
      batchMealCount: 10,
    };
    const createMeal = new CreateMealUseCase(mealRepository);
    let response: ResponseDTO = await createMeal.execute(
      meal1 as ICreateMealRequestDTO
    );
    expect(Boolean(response.success)).toBe(true);
    const name = response.data.name;

    const getMeal = new GetMealByNameUseCase(mealRepository);
    const res = await getMeal.execute(name);

    expect(res.success).toBe(true);
    expect(res.data).toMatchObject({
      name: "Test Meal 1",
      mealTime: "Breakfast",
      isVegetarian: false,
      season: "Warm",
      babyAllowed: true,
      batchMealCount: 10,
    });
  });
});
