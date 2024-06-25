import { ICreateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/CreateMeal";
import { IMealInRequestDTO } from "@/restaurant/domain/dtos/Meal/MealIn";
import { IMealOutRequestDTO } from "@/restaurant/domain/dtos/Meal/MealOut";
import { IUpdateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/UpdateMeal";
import { PaginationDTO } from "@/restaurant/domain/dtos/Pagination";
import MongooseClient from "../database/mongoose/MongooseClient";
import MealModel from "../database/mongoose/models/meal";
import { IMealsRepository } from "@/restaurant/application/repositories/Meal";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";
import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";

/**
 * Mongoo implementation of the meal repository.
 *
 * @class
 * @implements {IMealsRepository}
 */
export class MealRepository implements IMealsRepository {
  /**
   * Creates an instance of MealRepository.
   *
   * @constructor
   * @param {MongooClient} mongoose - The Mongoo client instance.
   */
  constructor(private mongoose: MongooseClient) {}

  /**
   * Creates a new meal.
   *
   * @async
   * @param {ICreateMealRequestDTO} data - The meal data.
   * @returns {Promise<IMealOutRequestDTO>} The created meal.
   */
  async create(data: ICreateMealRequestDTO): Promise<IMealOutRequestDTO> {
    const meal = MealModel.create(data);
    return (await meal).toObject();
  }

  /**
   * Finds a meal by name.
   *
   * @async
   * @param {string} name - The name to search for.
   * @returns {Promise<IMealInRequestDTO | unknown>} The found meal or undefined.
   */
  async findByName(name: string): Promise<IMealInRequestDTO | unknown> {
    const meal = await MealModel.findOne({ name: name }).exec();
    return meal?.toObject();
  }

  /**
   * Finds a meal by ID.
   *
   * @async
   * @param {string} id - The ID of the meal to find.
   * @returns {Promise<IMealInRequestDTO | unknown>} The found meal or null.
   */
  async findById(id: string): Promise<IMealInRequestDTO | unknown> {
    const meal = await MealModel.findById(id).exec();
    return meal?.toObject();
  }

  /**
   * Finds a meal by season and baby allowance.
   *
   * @async
   * @param {IMealInWithConstrainsDTO} constraints - constrains the meal shall have.
   * @returns {Promise<Array<IMealInRequestDTO> | unknown>} The found meal list or null.
   */
  async findWithConstrains(constraints: IMealInWithConstrainsDTO): Promise<Array<IMealInRequestDTO> | unknown>{
    const seasonsToFind = (!constraints.season || constraints.season === Seasons.Any) ? [Seasons.Any] : [constraints.season, Seasons.Any];
    const meal = await MealModel.find({season: seasonsToFind, babyAllowed: constraints.babyAllowed}).exec();
    return meal.map(function(model) { return model.toObject(); });
  }

  /**
   * Retrieves a paginated list of meals.
   *
   * @async
   * @returns {Promise<PaginationDTO>} The paginated list of meals.
   */
  async findAll(): Promise<PaginationDTO> {
    const perPage = 10;
    const meals = await MealModel.find({})
      .sort({ name: "asc" })
      .exec();
    const total = await MealModel.countDocuments().exec();

    return {
      body: meals.map(function(model) { return model.toObject(); }),
      total,
      page: 0,
      last_page: Math.ceil(total / perPage),
    };
  }

  /**
   * Updates a meal with new data.
   *
   * @async
   * @param {IMealOutRequestDTO} meal - The meal to update.
   * @param {IUpdateMealRequestDTO} data - The updated meal data.
   * @returns {Promise<IMealOutRequestDTO | unknown>} The updated meal.
   */
  async update(
    meal: IMealOutRequestDTO,
    data: IUpdateMealRequestDTO
  ): Promise<IMealOutRequestDTO | unknown> {
    const mealUpdated = await MealModel.findOneAndUpdate(
      { _id:  meal.id },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
    return mealUpdated?.toObject();
  }

  /**
   * Deletes a meal by ID.
   *
   * @async
   * @param {string} id - The ID of the meal to delete.
   * @returns {Promise<void>} A Promise that resolves once the meal is deleted.
   */
  async delete(id: string): Promise<void> {
    await MealModel.findOneAndDelete({ _id: id });
  }
}
