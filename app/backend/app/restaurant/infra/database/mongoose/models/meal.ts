import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing the structure of a meal.
 *
 * @interface
 */
interface IMeal extends Document{
  _id: String;
  name: String;
  mealTime: MealTime;
  ingridientList: Array<Ingridient>;
  isVegetarian: Boolean;
  season: Seasons;
  babyAllowed: Boolean;
  recipe: Array<String>;
}

const MealSchema = new Schema<IMeal>({
  name: {type: String},
  mealTime: {type: String, enum: MealTime},
  ingridientList: {type: Array<Ingridient>()},
  isVegetarian: {type: Boolean},
  season: {type: String, enum: Seasons},
  babyAllowed: {type: Boolean},
  recipe: {type: Array<String>()},
});

const MealModel = model('MealSchema', MealSchema);

export default MealModel;