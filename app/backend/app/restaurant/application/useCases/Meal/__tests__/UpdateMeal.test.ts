import { mongooseClient } from "@/restaurant/infra/database/connect";
import { CreateMealUseCase } from "../implementations/CreateMeal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { UpdateMealUseCase } from "../implementations/UpdateMeal";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";


describe("Update Meal Use Case", () => {
  let mealRepository: IMealsRepository;
  beforeAll(async () => {
    mealRepository = new MealRepository(mongooseClient);
  });

  it("should update the meal", async () => {
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
    const id = response.data.id;

    const updateMeal = new UpdateMealUseCase(mealRepository);
    const res = await updateMeal.execute(id, {
      name: "Test Meal 2",
      mealTime: MealTime.Lunch,
      isVegetarian: true,
      season: Seasons.Cold,
      babyAllowed: false,
      batchMealCount: 1,
    });

    expect(res.success).toBe(true);
    expect(res.data).toMatchObject({
      name: "Test Meal 2",
      mealTime: "Lunch",
      isVegetarian: true,
      season: "Cold",
      babyAllowed: false,
      batchMealCount: 1,
    });
  });
});
