import { IngridientInterface } from "../../entities/Ingridient";

/**
 * Data Transfer Object (DTO) representing the request to create a new ingridient.
 *
 * @interface
 */
export interface IUpdateIngridientRequestDTO extends Partial<IngridientInterface> {}
