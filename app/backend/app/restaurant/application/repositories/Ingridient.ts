import { ICreateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/CreateIngridient";
import { IIngridientInRequestDTO } from "@/restaurant/domain/dtos/Ingridient/IngridientIn";
import { IIngridientOutRequestDTO } from "@/restaurant/domain/dtos/Ingridient/IngridientOut";
import { IUpdateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/UpdateIngridient";
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";

/**
 * Interface for the repository handling ingridient data.
 *
 * @interface
 */
export interface IIngridientsRepository {
  /**
   * Creates a new ingridient with the provided data.
   *
   * @async
   * @param {ICreateIngridientRequestDTO} data - The ingridient data to be created.
   * @returns {Promise<IIngridientOutRequestDTO>} The created ingridient data.
   */
  create(data: ICreateIngridientRequestDTO): Promise<IIngridientOutRequestDTO>;

  /**
   * Finds a ingridient by their name.
   *
   * @async
   * @param {string} name - The name address of the ingridient.
   * @returns {Promise<IIngridientInRequestDTO | unknown>} The found ingridient data, or undefined if not found.
   */
  findByName(name: String): Promise<IIngridientInRequestDTO | unknown>;

  /**
   * Finds a ingridient by their ID.
   *
   * @async
   * @param {string} id - The ID of the ingridient.
   * @returns {Promise<IIngridientInRequestDTO | unknown>} The found ingridient data, or undefined if not found.
   */
  findById(id: string): Promise<IIngridientInRequestDTO | unknown>;

  /**
   * Retrieves a paginated list of ingridients.
   *
   * @async
   * @returns {Promise<PaginationDTO>} The paginated list of ingridients.
   */
  findAll(): Promise<PaginationDTO>;

  /**
   * Updates the ingridient data with the provided information.
   *
   * @async
   * @param {IIngridientOutRequestDTO} ingridient - The ingridient to be updated.
   * @param {IUpdateIngridientRequestDTO} data - The updated ingridient data.
   * @returns {Promise<IIngridientOutRequestDTO>} The updated ingridient data.
   */
  update(
    ingridient: IIngridientOutRequestDTO,
    data: IUpdateIngridientRequestDTO
  ): Promise<IIngridientOutRequestDTO | unknown>;

  /**
   * Deletes a ingridient by their ID.
   *
   * @async
   * @param {string} id - The ID of the ingridient to be deleted.
   * @returns {Promise<void>} A promise that resolves when the ingridient is deleted.
   */
  delete(id: string): Promise<void>;
}
