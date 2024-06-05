import { MealInterface } from "@/restaurant/domain/entities/Meal";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { WeekDays } from "@/restaurant/domain/enums/weekSchedule/WeekDays";
import { Day, DayInterface } from "@/restaurant/domain/valueObj/Day";

/**
 * Filters meals based on meal time, season, and baby allowance.
 * @param meals - List of all available meals.
 * @param mealTime - The meal time (Breakfast, Lunch, Dinner).
 * @param season - The current season.
 * @param babyAllowed - Whether baby-allowed meals are required.
 * @returns Filtered list of meals.
 */
export function getMealsForMealTime(
  meals: MealInterface[],
  mealTime: MealTime,
  season: string,
  babyAllowed: boolean
): MealInterface[] {
  return meals.filter(
    (meal) =>
      meal.mealTime === mealTime &&
      (meal.season === season || meal.season === "Any") &&
      (!babyAllowed || meal.babyAllowed)
  );
}

/**
 * Checks if a meal can be added to the day without violating constraints.
 * @param day - The current day's meal plan.
 * @param meal - The meal to be added.
 * @returns True if the meal can be added, false otherwise.
 */
export function canAddMealToDay(
  day: DayInterface,
  meal: MealInterface
): boolean {
  const meals = [day.breakfast, day.lunch, day.dinner];
  return (
    meals.filter((m) => m === null).length == 0 ||
    (!meals.some((m) => m.name === meal.name) &&
      meals.filter((m) => !m.isVegetarian).length < 1)
  );
}

/**
 * Validates if a meal can be added based on its batch meal count.
 * @param meal - The meal to be validated.
 * @param days - The current week's meal plan.
 * @param currentDayIndex - The index of the current day.
 * @returns True if the meal is valid for the batch count, false otherwise.
 */
export function isMealValidForBatchCount(
  meal: MealInterface,
  mealsInCurrentWeek: DayInterface[],
  dayIndex: number
): boolean {
  if (meal.batchMealCount === 0) {
    return true;
  }

  const currentCount: Number = mealsInCurrentWeek
    .slice(Math.max(0, dayIndex - 3), dayIndex)
    .reduce((count, day) => {
      return (
        count +
        [day.breakfast, day.lunch, day.dinner].filter(
          (m) => m.name === meal.name
        ).length
      );
    }, 0);

  return currentCount < meal.batchMealCount;
}

/**
 * Fills a week with meals based on constraints.
 * @param allMeals - List of all available meals.
 * @param season - The current season.
 * @param babyAllowed - Whether baby-allowed meals are required.
 * @param previousWeek - The previous week's meal plan.
 * @returns A week filled with meals.
 */
export function fillWeekWithMeals(
  meals: MealInterface[],
  season: Seasons,
  babyAllowed: boolean,
  previousWeek?: DayInterface[]
): DayInterface[] {
  const week: DayInterface[] = [];
  const mealTimes = [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner];
  const days = Object.values(WeekDays);

  for (let i = 0; i < 7; i++) {
    const day: DayInterface = Day.create({
      name: days[i],
      breakfast: {} as MealInterface,
      lunch: {} as MealInterface,
      dinner: {} as MealInterface,
    });

    mealTimes.forEach((mealTime) => {
      const availableMeals = getMealsForMealTime(
        meals,
        mealTime,
        season,
        babyAllowed
      ).filter(
        (meal) =>
          isMealValidForBatchCount(meal, week, i) && canAddMealToDay(day, meal)
      );

      if (availableMeals.length > 0) {
        day[mealTime.toLowerCase() as keyof DayInterface] =
          availableMeals[0] as any;
      } else {
        throw new Error(
          `No valid meals available for ${mealTime} on ${days[i]}`
        );
      }
    });

    week.push(day);
  }

  if (previousWeek) {
    week.unshift(...previousWeek);
    week.splice(7);
  }

  return week;
}

/**
 * Given a date, returns the previous start of the week (Monday).
 * @param date - The date from which to find the previous Monday.
 * @returns A new Date object representing the previous Monday.
 */
export function getPreviousStartOfWeek(date: Date): Date {
  const currentDay = date.getDay();
  const daysSinceMonday = (currentDay + 6) % 7; // Adjusting to consider Monday as the start of the week
  const previousMonday = new Date(date);
  previousMonday.setDate(date.getDate() - daysSinceMonday);
  previousMonday.setHours(12, 0, 0, 0); // Set to mid day

  return previousMonday;
}

/**
 * Checks if the meal plan meets the following criteria:
 * - At least 2 different breakfast meals.
 * - At least 7 different lunch and dinner meals, considering batchMealCount.
 *
 * @param meals - Array of meals to be checked.
 * @returns {boolean} - True if all conditions are met, false otherwise.
 */
export function checkMeals(meals: MealInterface[]): boolean {
  let breakfastCount: number = 0;
  let lunchCount: number = 0;
  let dinnerCount: number = 0;

  for (let meal of meals) {
    const batchMealCount = meal.batchMealCount as number;
    switch (meal.mealTime) {
      case MealTime.Breakfast:
        breakfastCount++;
        break;
      case MealTime.Lunch:
        lunchCount += batchMealCount > 0 ? batchMealCount : 1;
        break;
      case MealTime.Dinner:
        dinnerCount += batchMealCount > 0 ? batchMealCount : 1;
        break;
    }
  }

  return breakfastCount >= 2 && lunchCount >= 7 && dinnerCount >= 7;
}
