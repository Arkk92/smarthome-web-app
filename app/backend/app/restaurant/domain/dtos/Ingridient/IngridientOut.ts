import { IngridientInterface } from "../../entities/Ingridient";
/**
 * Data Transfer Object (DTO) representing the output ingridient data.
 *
 * @interface
 */
export interface IIngridientOutRequestDTO extends IngridientInterface {
  /**
   * The optional creation date of the ingridient.
   */
  createdAt?: Date;
}
