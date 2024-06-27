import type { MealInterface } from "@/apps/restaurant/domain/entities/Meal";
import { MealTime } from "@/apps/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/apps/restaurant/domain/enums/meal/Seasons";

const defaultMealModel: MealInterface = {
    id: undefined,
    name: '',
    babyAllowed: false,
    isVegetarian: false,
    mealTime: MealTime.Breakfast,
    season: Seasons.Any,
    ingridientList: [],
    recipe: [''],
    batchMealCount: 0,
  }

  export default defaultMealModel;