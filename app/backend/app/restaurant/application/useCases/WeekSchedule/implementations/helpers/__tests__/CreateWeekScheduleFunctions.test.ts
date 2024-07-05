import { Meal, MealInterface } from "@/restaurant/domain/entities/Meal";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import {
  canAddMealToDay,
  checkMeals,
  fillWeekWithMeals,
  getMealsForMealTime,
  getPreviousStartOfWeek,
  isMealValidForBatchCount,
} from "../CreateWeekScheduleFunctions";
import { Day, DayInterface } from "@/restaurant/domain/valueObj/Day";
import { WeekDays } from "@/restaurant/domain/enums/weekSchedule/WeekDays";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";

const ingridients: Ingridient[] = [
  Ingridient.create({
    id: "1",
    name: "Bread",
    quantity: 1,
    apiUri: "/api/bread",
    unit: "slice",
  }),
  Ingridient.create({
    id: "2",
    name: "Salad",
    quantity: 1,
    apiUri: "/api/salad",
    unit: "bowl",
  }),
  Ingridient.create({
    id: "3",
    name: "Soup",
    quantity: 1,
    apiUri: "/api/soup",
    unit: "bowl",
  }),
  Ingridient.create({
    id: "4",
    name: "Chicken",
    quantity: 1,
    apiUri: "/api/chicken",
    unit: "piece",
  }),
];

const meals: Meal[] = [
  Meal.create({
    name: "Vegetarian Breakfast",
    mealTime: MealTime.Breakfast,
    ingridientList: [ingridients[0]],
    isVegetarian: true,
    season: Seasons.Any,
    babyAllowed: true,
    recipe: ["Step 1"],
    batchMealCount: 0,
  }),
  Meal.create({
    name: "Vegetarian Lunch",
    mealTime: MealTime.Lunch,
    ingridientList: [ingridients[1]],
    isVegetarian: true,
    season: Seasons.Any,
    babyAllowed: true,
    recipe: ["Step 1"],
    batchMealCount: 0,
  }),
  Meal.create({
    name: "Vegetarian Dinner",
    mealTime: MealTime.Dinner,
    ingridientList: [ingridients[2]],
    isVegetarian: true,
    season: Seasons.Any,
    babyAllowed: true,
    recipe: ["Step 1"],
    batchMealCount: 0,
  }),
  Meal.create({
    name: "Non-Vegetarian Lunch",
    mealTime: MealTime.Lunch,
    ingridientList: [ingridients[3]],
    isVegetarian: false,
    season: Seasons.Any,
    babyAllowed: true,
    recipe: ["Step 1"],
    batchMealCount: 0,
  }),
];

describe("Helper Functions", () => {
  test("getMealsForMealTime should filter meals based on meal time, season, and baby allowance", () => {
    const filteredMeals = getMealsForMealTime(
      meals,
      MealTime.Lunch,
      Seasons.Any,
      true
    );
    expect(filteredMeals.length).toBe(2);
    expect(filteredMeals).toEqual(expect.arrayContaining([meals[1], meals[3]]));
  });

  test("canAddMealToDay should return true if a meal can be added to the day", () => {
    const day1: DayInterface = Day.create({
      name: WeekDays.Monday,
      breakfast: meals[0],
      lunch: meals[1],
      dinner: meals[2],
    });
    const day2: DayInterface = Day.create({
      name: WeekDays.Thursday,
      breakfast: meals[1],
      lunch: meals[2],
      dinner: meals[0],
    });

    const week: DayInterface[] = [];
    week.push(day1);
    const meal = meals[3];
    expect(canAddMealToDay(day2, meal, week, 1)).toBe(true);
  });

  test("isMealValidForBatchCount should return true if a meal is valid for the batch count", () => {
    const days: DayInterface[] = [
      Day.create({
        name: WeekDays.Monday,
        breakfast: meals[0],
        lunch: meals[1],
        dinner: meals[2],
      }),
      Day.create({
        name: WeekDays.Tuesday,
        breakfast: meals[0],
        lunch: meals[1],
        dinner: meals[2],
      }),
    ];
    const meal = meals[0];
    expect(isMealValidForBatchCount(meal, days, 1)).toBe(true);
  });
});

describe("fillWeekWithMeals Function", () => {

  test("should throw an error when no valid meals are available for a specific meal time and day", () => {
    const invalidMeals: MealInterface[] = [
      Meal.create({
        ...(meals[0] as MealInterface),
        mealTime: MealTime.Breakfast,
        season: Seasons.Cold, // No meals available for the 'Cold' season
      }),
    ];

    expect(() => fillWeekWithMeals(invalidMeals, Seasons.Cold, true)).toThrow();
  });
});

describe("getPreviousStartOfWeek", () => {
  it("should return the previous Monday for a given date", () => {
    const testCases: { input: string; expected: string }[] = [
      { input: "2023-05-29", expected: "2023-05-29" }, // Monday
      { input: "2023-05-30", expected: "2023-05-29" }, // Tuesday
      { input: "2023-05-31", expected: "2023-05-29" }, // Wednesday
      { input: "2023-06-01", expected: "2023-05-29" }, // Thursday
      { input: "2023-06-02", expected: "2023-05-29" }, // Friday
      { input: "2023-06-03", expected: "2023-05-29" }, // Saturday
      { input: "2023-06-04", expected: "2023-05-29" }, // Sunday
      { input: "2023-06-05", expected: "2023-06-05" }, // Next Monday
    ];

    testCases.forEach(({ input, expected }) => {
      const date = new Date(input);
      const result = getPreviousStartOfWeek(date);
      const parsedResult = result.toISOString().split("T")[0]
      const parsedExpected = new Date(expected).toISOString().split("T")[0]
      expect(parsedResult).toEqual(parsedExpected);
    });
  });
});
describe('checkMeals', () => {
  test('returns false if less than 2 different breakfast meals', () => {
    const meals: MealInterface[] = [
      { name: 'Breakfast 1', mealTime: MealTime.Breakfast, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 }
    ];
    expect(checkMeals(meals)).toBe(false);
  });

  test('returns false if less than 7 different lunch meals', () => {
    const meals: MealInterface[] = [
      { name: 'Lunch 1', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 2', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 }
    ];
    expect(checkMeals(meals)).toBe(false);
  });

  test('returns false if less than 7 different dinner meals', () => {
    const meals: MealInterface[] = [
      { name: 'Dinner 1', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 2', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 }
    ];
    expect(checkMeals(meals)).toBe(false);
  });

  test('returns true if all conditions are met', () => {
    const meals: MealInterface[] = [
      { name: 'Breakfast 1', mealTime: MealTime.Breakfast, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Breakfast 2', mealTime: MealTime.Breakfast, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 1', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 2', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 3', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 4', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 5', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 6', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 7', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 1', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 2', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 3', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 4', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 5', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 6', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Dinner 7', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 }
    ];
    expect(checkMeals(meals)).toBe(true);
  });

  test('returns true if batchMealCount is considered for lunches and dinners', () => {
    const meals: MealInterface[] = [
      { name: 'Breakfast 1', mealTime: MealTime.Breakfast, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Breakfast 2', mealTime: MealTime.Breakfast, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 0 },
      { name: 'Lunch 1', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 3 },
      { name: 'Lunch 2', mealTime: MealTime.Lunch, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 4 },
      { name: 'Dinner 1', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 4 },
      { name: 'Dinner 2', mealTime: MealTime.Dinner, ingridientList: [], isVegetarian: true, season: Seasons.Any, babyAllowed: true, recipe: [], batchMealCount: 3 }
    ];
    expect(checkMeals(meals)).toBe(true);
  });
});