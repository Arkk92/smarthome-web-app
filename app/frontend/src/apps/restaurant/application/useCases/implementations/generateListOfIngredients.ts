import type IngredientApi from "@/apps/restaurant/infra/services/http/axios/ingredient/IngredientApi";
import type { IGenerateListOfIngredientsUseCase, IngredientList } from "../generateListOfIngredients";
import type { WeekScheduleInterface } from "@/apps/restaurant/domain/entities/WeekSchedule";
import type { IngridientInterface } from "@/apps/restaurant/domain/entities/Ingridient";
import type { ResponseDTO } from "@/apps/restaurant/domain/dtos/Response";

/**
 * Use case for generating a list of ingredients.
 *
 * @class
 * @implements {IGenerateListOfIngredientsUseCase}
 */
export class GenerateListOfIngredientsUseCase
  implements IGenerateListOfIngredientsUseCase
{
  /**
   * Creates an instance of GenerateListOfIngredientsUseCase.
   *
   * @constructor
   * @param {IngredientApi} ingredientApi - The API for ingredient data.
   */
  constructor(private ingredientApi: IngredientApi) {}

  /**
   * Executes the generate list of ingredients use case.
   *
   * @async
   * @param {WeekScheduleInterface} week - The week data for generating the list.
   * @returns {Array<IngridientInterface>} The response data.
   */
  async execute(week: WeekScheduleInterface): Promise<ResponseDTO> {
    try {
      const ingredientList: IngridientInterface[] = [];

      week.weekDays.forEach((day) => {
        day.breakfast.ingridientList.forEach((ingredient) => {
          if (
            ingredientList.filter((ing) => ing.name === ingredient.name)
              .length > 1
          ) {
            const pos = ingredientList.findIndex(
              (i) => i.name === ingredient.name
            );
            (ingredientList[pos].quantity as number) +=
              ingredient.quantity as number;
          } else {
            ingredientList.push(ingredient);
          }
        });
      });

      const ingredientsToShop: IngredientList[] = []
      const allIngredientList: IngridientInterface[] =
        await this.ingredientApi.fetchAllIngredients();

      if (allIngredientList.length > 0) {
        ingredientList.forEach(ingredient => {
            const baseIngredient = allIngredientList.filter(ing => ing.name === ingredient.name );
            const ingredientQuantity = baseIngredient.length > 0 ? Math.ceil((ingredient.quantity as number / (baseIngredient[0].quantity as number))) : 1;
            ingredientsToShop.push({
                ingredient: ingredient,
                quantity: ingredientQuantity
            })
        })
      } else {
        throw new Error(
          "Ingredient List couldn't be generated due to no ingredients couldn't be fetch"
        );
      }
      return { data: ingredientsToShop, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
