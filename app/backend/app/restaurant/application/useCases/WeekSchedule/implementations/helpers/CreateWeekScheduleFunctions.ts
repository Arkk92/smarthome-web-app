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

  const currentCount: number = mealsInCurrentWeek
    .slice(Math.max(0, dayIndex - (meal.batchMealCount as number)), dayIndex)
    .reduce((count, day) => {
      return (
        count +
        [day.breakfast, day.lunch, day.dinner].filter(
          (m) => m && m.name === meal.name
        ).length
      );
    }, 0);

  // Ensure batch meal is repeated the second day after it was initially served
  if (dayIndex >= 2 && currentCount < (meal.batchMealCount as number)) {
    const twoDaysAgoMeal = mealsInCurrentWeek[dayIndex - 2];
    if (twoDaysAgoMeal && [twoDaysAgoMeal.lunch, twoDaysAgoMeal.dinner].some(m => m && m.name === meal.name)) {
      console.log(`Validating batch meal ${meal.name}: It must be repeated today.`);
      return true;
    }
  }

  return currentCount < (meal.batchMealCount as number);
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
    // console.error("NEW DAY:\n")
    for (let mealTime of mealTimes) {

      const availableMeals = shuffleArray(
        getMealsForMealTime(meals, mealTime, season, babyAllowed).filter(
          (meal) =>
            isMealValidForBatchCount(meal, week, i) &&
            canAddMealToDay(day, meal, week, i)
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
        // console.error("mealForMealTime: ");
        
        getMealsForMealTime(meals, mealTime, season, babyAllowed).filter(
            (meal) => {
              // console.error({
              //   meal: meal.name,
              //   day: {breakfast: day.breakfast.name, lunch: day.lunch.name, dinner: day.dinner.name},
              //   week: week.map((day) => {return {breakfast: day.breakfast.name, lunch: day.lunch.name, dinner: day.dinner.name}}),
              //   canAddMealToDay: canAddMealToDay(day, meal, week, i),
              //   isMealValidForBatchCount: isMealValidForBatchCount(meal, week, i)
              // })
              return isMealValidForBatchCount(meal, week, i) &&
              canAddMealToDay(day, meal, week, i)
            }
        )
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
    if (mealTime === MealTime.Breakfast) {
      // Ensure breakfast meals are spaced as far apart as possible
      const previousMealIndices = previousMeals
        .map((m, index) => (m.name === meal.name ? index : -1))
        .filter((index) => index !== -1);
      if (previousMealIndices.some((index) => dayIndex - index < 2)) {
        return false;
      }
    } else {
      // Check that the meal was not used the previous day
      if (
        dayIndex > 0 &&
        previousMeals[dayIndex - 1] &&
        previousMeals[dayIndex - 1].id === meal.id
      ) {
        return false;
      }
      // For lunch and dinner, check for batch meal logic
      if ((meal.batchMealCount as number) > 0) {
        const batchCount = batchTracker[(meal.id as string) || ""] || 0;
        return (
          batchCount < (meal.batchMealCount as number) &&
          previousMeals[dayIndex - 1]?.id !== meal.id
        );
      } else {
        // Check the meal is not in the previous meals
        return !previousMeals.includes(meal);
      }
    }
    return true;
  });

  if (filteredMeals.length === 0) {
    filteredMeals = availableMeals;
  }
  const intersect = filteredMeals.filter(meal => 
    Object.keys(batchTracker).some(id => id === (meal.id as string) || ""));
  if(intersect.length > 0){
    // Prioritize batched meals
    return intersect[0];
  }
  

  return filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
}

/**
 * Checks if a meal can be added to the day without violating constraints.
 * @param day - The current day's meal plan.
 * @param meal - The meal to be added.
 * @param mealsInCurrentWeek - The current week's meal plan.
 * @param dayIndex - The index of the current day.
 * @returns True if the meal can be added, false otherwise.
 */
export function canAddMealToDay(
  day: DayInterface,
  meal: MealInterface,
  mealsInCurrentWeek: DayInterface[],
  dayIndex: number
): boolean {
  if (meal.mealTime === MealTime.Breakfast) {
    return canAddBreakfast(meal, mealsInCurrentWeek, dayIndex);
  } else {
    return canAddLunchOrDinner(day, meal, mealsInCurrentWeek, dayIndex);
  }
}

/**
 * Checks if a breakfast meal can be added to the day without violating constraints.
 * @param meal - The meal to be added.
 * @param mealsInCurrentWeek - The current week's meal plan.
 * @param dayIndex - The index of the current day.
 * @returns True if the meal can be added, false otherwise.
 */
function canAddBreakfast(
  meal: MealInterface,
  mealsInCurrentWeek: DayInterface[],
  dayIndex: number
): boolean {
  const previousBreakfast =
    dayIndex > 0 ? mealsInCurrentWeek[dayIndex - 1].breakfast : null;
  const furtherBackBreakfast =
    dayIndex > 1 ? mealsInCurrentWeek[dayIndex - 2].breakfast : null;

  if (previousBreakfast && meal.name === previousBreakfast.name) {
    return false;
  }
  if (furtherBackBreakfast && meal.name === furtherBackBreakfast.name) {
    return false;
  }

  return true;
}

/**
 * Checks if a lunch or dinner meal can be added to the day without violating constraints.
 * @param day - The current day's meal plan.
 * @param meal - The meal to be added.
 * @param mealsInCurrentWeek - The current week's meal plan.
 * @param dayIndex - The index of the current day.
 * @returns True if the meal can be added, false otherwise.
 */
function canAddLunchOrDinner(
  day: DayInterface,
  meal: MealInterface,
  mealsInCurrentWeek: DayInterface[],
  dayIndex: number
): boolean {
  const isVegetarianMeal = meal.isVegetarian;
  const meals = [day.lunch, day.dinner].filter(m => m && Object.keys(m).length > 0);
  const nonVegetarianCount = meals.filter((m) => m && !m.isVegetarian).length;

  if (!isVegetarianMeal && nonVegetarianCount >= 1) {
    console.log(`Cannot add ${meal.name}: There is already a non-vegetarian meal.`);
    return false;
  }

  const otherMeal = meal.mealTime === MealTime.Lunch ? day.dinner : day.lunch;
  if (otherMeal && Object.keys(otherMeal).length > 0 && isVegetarianMeal && otherMeal.isVegetarian) {
    const remainingDays = mealsInCurrentWeek.slice(dayIndex + 1);
    const remainingMeals = remainingDays.flatMap((d) => [d.lunch, d.dinner]).filter(m => m && Object.keys(m).length > 0);
    const availableNonVegMeals = remainingMeals.filter((m) => !m.isVegetarian);
    
    if (availableNonVegMeals.length === 0) {
      console.log(`Allowing ${meal.name}: No more non-vegetarian meals available.`);
    } else {
      console.log(`Cannot add ${meal.name}: Both lunch and dinner would be vegetarian.`);
      return false;
    }
  }

  // Check if the meal has already been used this week (for non-batch meals)
  const mealOccurrences = mealsInCurrentWeek
    .slice(0, dayIndex)
    .flatMap((d) => [d.lunch, d.dinner])
    .filter((m) => m && Object.keys(m).length > 0 && m.name === meal.name).length;

  if (meal.batchMealCount === 0 && mealOccurrences > 0) {
    console.log(`Cannot add ${meal.name}: It has already been added earlier this week.`);
    return false;
  }

  return true;
}
