import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";

import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { IUpdateMealUseCase } from "@/restaurant/application/useCases/Meal/UpdateMeal";
import { IUpdateMealRequestDTO } from "@/restaurant/domain/dtos/Meal/UpdateMeal";
import { IController } from "../IController";
import { IHttpRequest } from "@/presentation/http/helpers/IHttpRequest";
import { Meal } from "@/restaurant/domain/entities/Meal";

/**
 * Controller for handling requests to update a meal.
 */
export class UpdateMealController implements IController {
  /**
   * Updates an instance of UpdateMealController.
   * @param updateMealUseCase The use case for creating a meal.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private updateMealUseCase: IUpdateMealUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to update a meal.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;
    // Validate path and body parameters
    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathStringParams = Object.keys(httpRequest.path);
      const bodyParams = Object.keys(httpRequest.body);
      const entityKeys = Meal.getEntityKeys().filter((key) => key !== "id");

      if (
        pathStringParams.includes("id") &&
        bodyParams.some((item) => entityKeys.includes(item))
      ) {
        const id = (httpRequest.path as { id: string }).id;
        const data = httpRequest.body as IUpdateMealRequestDTO;
        // Execute the update meal use case
        response = await this.updateMealUseCase.execute(id, data);
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Update meal failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Update meal succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
