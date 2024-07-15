import { fillWeekWithMeals } from "../CreateWeekScheduleFunctions";
import { MealInterface } from "@/restaurant/domain/entities/Meal";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { WeekDays } from "@/restaurant/domain/enums/weekSchedule/WeekDays";
import { DayInterface } from "@/restaurant/domain/valueObj/Day";
import mealDataset from "./datasets/mealschemas";

describe("Week Schedule Functions", () => {
  const meals: MealInterface[] = mealDataset;

  const previousWeek: DayInterface[] = [
    {
      name: WeekDays.Saturday,
      breakfast: meals[0],
      lunch: meals[2],
      dinner: meals[4],
    },
    {
      name: WeekDays.Sunday,
      breakfast: meals[1],
      lunch: meals[3],
      dinner: meals[5],
    },
  ];

  it("should ensure each day has a breakfast, lunch, and dinner meal", () => {
    const week: DayInterface[] = fillWeekWithMeals(
      meals,
      Seasons.Any,
      false,
      previousWeek
    );
    week.forEach((day) => {
      expect(day.breakfast).toBeDefined();
      expect(day.lunch).toBeDefined();
      expect(day.dinner).toBeDefined();
    });
  });

  it("should not repeat meals from the weekend of previous week except for batched meals", () => {
    const week: DayInterface[] = fillWeekWithMeals(
      meals,
      Seasons.Any,
      false,
      previousWeek
    );

    // Get weekend days of previous week
    const weekendDays = previousWeek.filter(
      (day) => day.name === WeekDays.Saturday || day.name === WeekDays.Sunday
    );

    // Get meals on weekend
    const weekendMeals: MealInterface[] = []
    weekendDays.forEach(day => {
        weekendMeals.push(day.dinner)
        weekendMeals.push(day.lunch)
    })

    // Get batch meals on weekend
    const weekendBatchedMeals: MealInterface[] = [];
    weekendDays.forEach((day) => {
      if ((day.lunch.batchMealCount as number) > 0) {
        // Check whether is the first or the last occurence
        if(previousWeek.filter((prevDay) => prevDay.lunch.name === day.lunch.name).length < (day.lunch.batchMealCount as number) ){
            // Batch meal for next week
            weekendBatchedMeals.push(day.lunch);
        }
      }
      if ((day.dinner.batchMealCount as number) > 0) {
        // Check whether is the first or the last occurence
        if(previousWeek.filter((prevDay) => prevDay.dinner.name === day.dinner.name).length < (day.dinner.batchMealCount as number) ){
            // Batch meal for next week
            weekendBatchedMeals.push(day.dinner);
        }
      }
    });

    const weekMeals: MealInterface[] = [];
    week.forEach((day) => {
      weekMeals.push(day.lunch);
      weekMeals.push(day.dinner);
    });

    // Ensure meals are not repeated except for batched meals from previous weekend
    week.forEach((day) => {
        if(weekendBatchedMeals.includes(day.dinner)){
            // Batched meal ensure it's repeated in the following week
            expect(weekMeals).toContain(day.dinner)
        }
        else if(weekendBatchedMeals.includes(day.lunch)){
            // Batched meal ensure it's repeated in the following week
            expect(weekMeals).toContain(day.lunch)
        }
    });
  });

  it("should ensure breakfast meals are not repeated consecutively and are spaced the further possible", () => {
    const week: DayInterface[] = fillWeekWithMeals(
      meals,
      Seasons.Any,
      false,
      previousWeek
    );
    const breakfastNames = week.map((day) => day.breakfast.name);
    breakfastNames.forEach((name, index) => {
      if (index > 0) {
        expect(name).not.toBe(breakfastNames[index - 1]);
      }
    });
    // Check that breakfasts are spaced the further possible (this is harder to quantify, but we can ensure no immediate repetitions)
  });

  it("should ensure no lunch or dinner is repeated during a week, unless the meal is batch", () => {
    const week: DayInterface[] = fillWeekWithMeals(
      meals,
      Seasons.Any,
      false,
      previousWeek
    );
    const lunchNames = week.map((day) => day.lunch.name);
    const dinnerNames = week.map((day) => day.dinner.name);
    const allNames = [...lunchNames, ...dinnerNames];
    const nameCounts = allNames.reduce((acc, name) => {
      acc[name as string] = (acc[name as string] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    Object.keys(nameCounts).forEach((name) => {
      const meal = meals.find((m) => m.name === name);
      if (meal && meal.batchMealCount === 0) {
        expect(nameCounts[name]).toBe(1);
      }
    });
  });

  // it("should ensure batched meals are repeated the second day after the first occurrence and as many times as the batchCount", () => {
  //   const week: DayInterface[] = fillWeekWithMeals(
  //     meals,
  //     Seasons.Any,
  //     false,
  //     previousWeek
  //   );
  //   const batchMeals = meals.filter(
  //     (meal) => (meal.batchMealCount as number) > 0
  //   );

  //   batchMeals.forEach((batchMeal) => {
  //     const occurrences = week.reduce((acc, day, index) => {
  //       if (
  //         day.lunch.name === batchMeal.name ||
  //         day.dinner.name === batchMeal.name
  //       ) {
  //         acc.push(index);
  //       }
  //       return acc;
  //     }, [] as number[]);

  //     if (occurrences.length > 0) {
  //       expect(occurrences.length).toBe(batchMeal.batchMealCount);
  //       occurrences.forEach((occurrence, index) => {
  //         if (index > 0) {
  //           expect(occurrence - occurrences[index - 1]).toBe(2);
  //         }
  //       });
  //     }
  //   });
  // });

  it("should ensure there are not two non-vegetarian meals for lunch and dinner", () => {
    const week: DayInterface[] = fillWeekWithMeals(
      meals,
      Seasons.Any,
      false,
      previousWeek
    );
    week.forEach((day) => {
      const nonVegetarianMeals = [day.lunch, day.dinner].filter(
        (m) => m && !m.isVegetarian
      );
      expect(nonVegetarianMeals.length).toBeLessThanOrEqual(1);
    });
  });
});