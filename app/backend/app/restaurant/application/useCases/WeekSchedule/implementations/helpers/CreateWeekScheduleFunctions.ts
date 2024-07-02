import { MealInterface } from "@/restaurant/domain/entities/Meal";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { WeekDays } from "@/restaurant/domain/enums/weekSchedule/WeekDays";
import { DayInterface } from "@/restaurant/domain/valueObj/Day";

export interface CheckedMeals {
  breakfast: number;
  lunch: number;
  dinner: number;
}

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
  season: Seasons,
  babyAllowed: boolean
): MealInterface[] {
  let mealList;
  if (!babyAllowed) {
    mealList = meals.filter(
      (meal) =>
        meal.mealTime === mealTime &&
        (meal.season === season || meal.season === Seasons.Any)
    );
  } else {
    mealList = meals.filter(
      (meal) =>
        meal.mealTime === mealTime &&
        (meal.season === season || meal.season === Seasons.Any) &&
        isBabyAllowed(meal, babyAllowed)
    );
  }
  return mealList;
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

  const previousMeals: { [key: string]: MealInterface[] } = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const batchTracker: Record<string, number> = {};

  if (previousWeek) {
    // Consider the last two days of the previous week for batch meals
    const lastTwoDays = previousWeek.slice(-2);
    lastTwoDays.forEach((day) => {
      previousMeals.breakfast.push(day.breakfast);
      previousMeals.lunch.push(day.lunch);
      previousMeals.dinner.push(day.dinner);
    });
  }

  for (let i = 0; i < 7; i++) {
    const day: DayInterface = {
      name: days[i],
      breakfast: {} as MealInterface,
      lunch: {} as MealInterface,
      dinner: {} as MealInterface,
    };

    for (let mealTime of mealTimes) {
      const availableMeals = shuffleArray(
        getMealsForMealTime(meals, mealTime, season, babyAllowed).filter(
          (meal) =>
            isMealValidForBatchCount(meal, week, i) &&
            canAddMealToDay(day, meal)
        )
      );

      if (availableMeals.length > 0) {
        const selectedMeal = getRandomMeal(
          availableMeals,
          previousMeals[mealTime.toLowerCase() as keyof DayInterface],
          mealTime,
          i,
          batchTracker
        );

        if (mealTime === MealTime.Breakfast) {
          day.breakfast = selectedMeal;
          previousMeals.breakfast.push(selectedMeal);
        } else if (mealTime === MealTime.Lunch) {
          day.lunch = selectedMeal;
          previousMeals.lunch.push(selectedMeal);
        } else if (mealTime === MealTime.Dinner) {
          day.dinner = selectedMeal;
          previousMeals.dinner.push(selectedMeal);
        }

        if ((selectedMeal.batchMealCount as number) > 0) {
          batchTracker[(selectedMeal.id as string) || ""] =
            (batchTracker[(selectedMeal.id as string) || ""] || 0) + 1;
        }
      } else {
        throw new Error(
          `No valid meals available for ${mealTime} on ${days[i]}`
        );
      }
    }

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

  // DEBUGGING
  const breakfastList = [];
  const lunchList = [];
  const dinnerList = [];

  for (let meal of meals) {
    const batchMealCount = meal.batchMealCount as number;
    switch (meal.mealTime) {
      case MealTime.Breakfast:
        breakfastCount++;
        breakfastList.push(meal.name);
        break;
      case MealTime.Lunch:
        lunchCount += batchMealCount > 0 ? batchMealCount : 1;
        lunchList.push(meal.name);
        break;
      case MealTime.Dinner:
        dinnerCount += batchMealCount > 0 ? batchMealCount : 1;
        dinnerList.push(meal.name);
        break;
    }
  }

  return breakfastCount >= 2 && lunchCount >= 7 && dinnerCount >= 7;
}

/**
 * Return the number of meals that meets the following criteria for each meal time:
 * - At least 2 different breakfast meals.
 * - At least 7 different lunch and dinner meals, considering batchMealCount.
 *
 * @param meals - Array of meals to be checked.
 * @returns {boolean} - True if all conditions are met, false otherwise.
 */
export function getCheckedMeals(meals: MealInterface[]): CheckedMeals {
  const missingMeals: CheckedMeals = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  };

  for (let meal of meals) {
    const batchMealCount = meal.batchMealCount as number;
    switch (meal.mealTime) {
      case MealTime.Breakfast:
        missingMeals.breakfast++;
        break;
      case MealTime.Lunch:
        missingMeals.lunch += batchMealCount > 0 ? batchMealCount : 1;
        break;
      case MealTime.Dinner:
        missingMeals.dinner += batchMealCount > 0 ? batchMealCount : 1;
        break;
    }
  }

  return missingMeals;
}

/**
 * Checks if a meal's babyAllowed status matches the provided babyAllowed value.
 *
 * @param meal - A MealInterface object representing a single meal.
 * @param babyAllowed - Boolean value or null. If true, checks if the meal is allowed for babies.
 *                      If false, checks if the meal is not allowed for babies.
 *                      If null, always returns true.
 * @returns A boolean indicating if the meal matches the babyAllowed status.
 */
function isBabyAllowed(
  meal: MealInterface,
  babyAllowed: boolean | null
): boolean {
  // If babyAllowed is null, we don't filter by babyAllowed status, hence always return true
  if (babyAllowed === null) {
    return true;
  }
  // Otherwise, return whether the meal's babyAllowed status matches the provided babyAllowed value
  return meal.babyAllowed === babyAllowed;
}

/**
 * Shuffle an array randomly.
 * @param array The array to shuffle.
 * @returns A new array with the elements shuffled.
 */
function shuffleArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Get a random meal ensuring it is not repeated consecutively.
 * @param availableMeals The list of available meals.
 * @param previousMeals The list of previous meals for the meal time.
 * @param mealTime The current meal time.
 * @param dayIndex The current day index.
 * @param batchTracker The tracker for batch meal counts.
 * @returns A random meal that meets the criteria.
 */
function getRandomMeal(
  availableMeals: MealInterface[],
  previousMeals: MealInterface[],
  mealTime: MealTime,
  dayIndex: number,
  batchTracker: Record<string, number>
): MealInterface {
  let filteredMeals = availableMeals.filter((meal) => {
    // Check that the meal was not used the previous day
    if (
      dayIndex > 0 &&
      previousMeals[dayIndex - 1] &&
      previousMeals[dayIndex - 1].id === meal.id
    ) {
      return false;
    }
    // For lunch and dinner, check for batch meal logic
    if (
      mealTime !== MealTime.Breakfast &&
      (meal.batchMealCount as number) > 0
    ) {
      const batchCount = batchTracker[(meal.id as string) || ""] || 0;
      return (
        batchCount < (meal.batchMealCount as number) &&
        previousMeals[dayIndex - 2]?.id !== meal.id
      );
    }
    return true;
  });

  if (filteredMeals.length === 0) {
    filteredMeals = availableMeals;
  }

  // Further filter for breakfast to maximize the distance from last occurrence
  if (mealTime === MealTime.Breakfast) {
    const breakfastCounts = previousMeals.reduce((acc, meal) => {
      acc[(meal.id as string) || ""] =
        (acc[(meal.id as string) || ""] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    filteredMeals = filteredMeals.filter((meal) => {
      if (!((meal.id as string) in breakfastCounts)) {
        return true;
      }
      const lastOccurrence = previousMeals
        .map((m, index) => (m.id === meal.id ? index : -1))
        .filter((index) => index !== -1)
        .pop();

      return lastOccurrence === undefined || dayIndex - lastOccurrence >= 2;
    });
  }

  return filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
}
