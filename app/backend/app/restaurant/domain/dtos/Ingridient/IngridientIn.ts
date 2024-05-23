import { IngridientInterface } from "../../entities/Ingridient";

/**
 * Data Transfer Object (DTO) representing the input ingridient data.
 *
 * @interface
 */
export interface IIngridientInRequestDTO extends IngridientInterface {
  /**
   * The optional creation date of the ingridient.
   */
  createdAt: Date;
}
