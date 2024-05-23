import { IngridientInterface } from "../../entities/Ingridient";

/**
 * Data Transfer Object (DTO) representing the request to create a new meal.
 *
 * @interface
 */
export interface IUpdateIngridientRequestDTO extends Partial<IngridientInterface> {
  name?: String;
  quantity?: Number;
  apiUri?: String;
}
