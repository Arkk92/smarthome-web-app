import { ICreateMealUseCase } from "@/application/restaurant/useCases/Meal/CreateMeal";
import { IController } from "../../../IController";
import { IHttpErrors } from "@/presentation/helpers/IHttpErrors";
import { HttpErrors } from "@/presentation/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/helpers/implementations/HttpSuccess";
import { IHttpSuccess } from "@/presentation/helpers/IHttpSuccess";
import { IHttpRequest } from "@/presentation/helpers/IHttpRequest";
import { IHttpResponse } from "@/presentation/helpers/IHttpResponse";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { HttpResponse } from "@/presentation/helpers/implementations/HttpResponse";
import { MealTime } from "@/restaurant/domain/enums/meal/MealTime";
import { Ingridient } from "@/restaurant/domain/entities/Ingridient";
import { Seasons } from "@/restaurant/domain/enums/meal/Seasons";

/**
 * Controller for handling requests to create a meal.
 */
export class CreateMealController implements IController {
  /**
   * Creates an instance of CreateMealController.
   * @param createMealCase The use case for creating a meal.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private createMealCase: ICreateMealUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to create a meal.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body);

      if (
        bodyParams.includes("name") &&
        bodyParams.includes("mealTime") &&
        bodyParams.includes("ingridientList") &&
        bodyParams.includes("isVegetarian") &&
        bodyParams.includes("season") &&
        bodyParams.includes("babyAllowed") &&
        bodyParams.includes("recipe")
      ) {
        // Extract meal creation data from the request body
        const createMealRequestDTO = httpRequest.body as {
          name: String;
          mealTime: MealTime;
          ingridientList: Array<Ingridient>;
          isVegetarian: Boolean;
          season: Seasons;
          babyAllowed: Boolean;
          recipe: Array<String>;
        };

        // Execute the create meal use case
        response = await this.createMealCase.execute(createMealRequestDTO);
      } else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Create meal failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Create meal succeeded, return a 201 Created response
      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
