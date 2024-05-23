import { IngridientInterface } from "@/restaurant/domain/entities/Ingridient";
import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing the structure of a ingridient.
 *
 * @interface
 */
interface IIngridient extends IngridientInterface, Document{
  id: String;
}

const IngridientSchema = new Schema<IIngridient>({
  name: {type: String},
  quantity: {type: Number},
  apiUri: {type: String}
});

const IngridientModel = model('IngridientSchema', IngridientSchema);

export default IngridientModel;