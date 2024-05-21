import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { MealInterface } from "@/restaurant/domain/entities/Meal";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing the structure of a meal.
 *
 * @interface
 */
interface IMeal extends MealInterface, Document{
  id: String;
}

const MealSchema = new Schema<IMeal>({
  name: {type: String},
  mealTime: {type: String, enum: MealTime},
  ingridientList: {type: Array<Ingridient>()},
  isVegetarian: {type: Boolean},
  season: {type: String, enum: Seasons},
  babyAllowed: {type: Boolean},
  recipe: {type: Array<String>()},
  batchMealCount: {type: Number}
});

const MealModel = model('MealSchema', MealSchema);

export default MealModel;