import { mongooseClient } from "@/restaurant/infra/database/connect";
import { CreateMealUseCase } from "../implementations/CreateMeal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { MealRepository } from "@/restaurant/infra/repositories/Meal";
import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { GetAllMealUseCase } from "../implementations/GetAllMeal";

describe("Get All Meal Use Case", () => {
  let mealRepository: IMealsRepository;
  beforeAll(async () => {
    mealRepository = new MealRepository(mongooseClient);
  });

  it("should retrieve all meals", async () => {
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
    const meal2 = {
      name: "Test Meal 2",
      mealTime: "Lunch",
      ingridientList: [],
      isVegetarian: true,
      season: "Cold",
      babyAllowed: false,
      recipe: ["Step 1", "Step 2"],
      batchMealCount: 8,
    };
    const createMeal = new CreateMealUseCase(mealRepository);
    let response: ResponseDTO = await createMeal.execute(meal1 as ICreateMealRequestDTO);
    expect(response.success).toBe(true); 
    response = await createMeal.execute(meal2 as ICreateMealRequestDTO);
    expect(response.success).toBe(true); 
    
    const getMeal = new GetAllMealUseCase(mealRepository);
    const res = await getMeal.execute(0);

    expect(res.success).toBe(true);
    expect(res.data.body).toContainEqual(
      expect.objectContaining({
        name: "Test Meal 1",
        mealTime: "Breakfast",
        isVegetarian: false,
        season: "Warm",
        babyAllowed: true,
        batchMealCount: 10,
      })
    );
    expect(res.data.body).toContainEqual(
      expect.objectContaining({
        name: "Test Meal 2",
        mealTime: "Lunch",
        isVegetarian: true,
        season: "Cold",
        babyAllowed: false,
        batchMealCount: 8,
      })
    );
  });
});
