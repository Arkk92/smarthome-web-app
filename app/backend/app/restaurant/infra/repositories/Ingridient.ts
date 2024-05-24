import { ICreateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/CreateIngridient";
import { IIngridientInRequestDTO } from "@/restaurant/domain/dtos/Ingridient/IngridientIn";
import { IIngridientOutRequestDTO } from "@/restaurant/domain/dtos/Ingridient/IngridientOut";
import { IUpdateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/UpdateIngridient";
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";
import MongooseClient from "../database/mongoose/MongooseClient";
import IngridientModel from "../database/mongoose/models/ingridient";
import { IIngridientsRepository } from "@/restaurant/application/repositories/Ingridient";

/**
 * Mongoo implementation of the ingridient repository.
 *
 * @class
 * @implements {IIngridientsRepository}
 */
export class IngridientRepository implements IIngridientsRepository {
  /**
   * Creates an instance of IngridientRepository.
   *
   * @constructor
   * @param {MongooClient} mongoose - The Mongoo client instance.
   */
  constructor(private mongoose: MongooseClient) {}

  /**
   * Creates a new ingridient.
   *
   * @async
   * @param {ICreateIngridientRequestDTO} data - The ingridient data.
   * @returns {Promise<IIngridientOutRequestDTO>} The created ingridient.
   */
  async create(data: ICreateIngridientRequestDTO): Promise<IIngridientOutRequestDTO> {
    const ingridient = new IngridientModel(data);
    await ingridient.save();
    return ingridient;
  }

  /**
   * Finds a ingridient by name.
   *
   * @async
   * @param {string} name - The name to search for.
   * @returns {Promise<IIngridientInRequestDTO | unknown>} The found ingridient or undefined.
   */
  async findByName(name: string): Promise<IIngridientInRequestDTO | unknown> {
    const ingridient = await IngridientModel.findOne({ name: name }).exec();
    return ingridient;
  }

  /**
   * Finds a ingridient by ID.
   *
   * @async
   * @param {string} id - The ID of the ingridient to find.
   * @returns {Promise<IIngridientInRequestDTO | unknown>} The found ingridient or null.
   */
  async findById(id: string): Promise<IIngridientInRequestDTO | unknown> {
    const ingridient = await IngridientModel.findById(id).exec();
    return ingridient;
  }

  /**
   * Retrieves a paginated list of ingridients.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of ingridients.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4;
    const ingridients = await IngridientModel.find({})
      .limit(Math.ceil((pageNumber - 1) * perPage))
      .sort({ name: "asc" })
      .exec();

    const total = await IngridientModel.countDocuments().exec();

    return {
      body: ingridients,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    };
  }

  /**
   * Updates a ingridient with new data.
   *
   * @async
   * @param {IIngridientOutRequestDTO} ingridient - The ingridient to update.
   * @param {IUpdateIngridientRequestDTO} data - The updated ingridient data.
   * @returns {Promise<IIngridientOutRequestDTO | unknown>} The updated ingridient.
   */
  async update(
    ingridient: IIngridientOutRequestDTO,
    data: IUpdateIngridientRequestDTO
  ): Promise<IIngridientOutRequestDTO | unknown> {
    var objForUpdate: IUpdateIngridientRequestDTO = {};
    Object.entries(data).forEach(([key, value]) => {
      objForUpdate[key as keyof IUpdateIngridientRequestDTO] = value ? value : ingridient[key as keyof IIngridientOutRequestDTO];  
    })

    const ingridientUpdated = await IngridientModel.findOneAndUpdate(
      { id: ingridient._id },
      { $set: objForUpdate }
    ).exec();

    return ingridientUpdated;
  }

  /**
   * Deletes a ingridient by ID.
   *
   * @async
   * @param {string} id - The ID of the ingridient to delete.
   * @returns {Promise<void>} A Promise that resolves once the ingridient is deleted.
   */
  async delete(id: string): Promise<void> {
    await IngridientModel.findOneAndDelete({ _id: id });
  }
}
