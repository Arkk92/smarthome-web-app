import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors"
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess"
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors"
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess"
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse"
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest"
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse"
import { IController } from "../IController"
import { IGetMealByIdUseCase } from "@/restaurant/application/useCases/Meal/GetMealById"


/**
 * Controller for handling requests to get meals.
 */
export class GetMealByIdController implements IController {
  /**
   * Creates an instance of GetMealController.
   * @param getMealUseCase The use case for getting meals.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getMealUseCase: IGetMealByIdUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to get meals.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validate path and body parameters
    if ( httpRequest.path) {
      const pathStringParams = Object.keys(httpRequest.path);

      if ( pathStringParams.includes("id") ){
        const id = (httpRequest.path as { id: string }).id;
        // Execute the get meals use case
        response = await this.getMealUseCase.execute(id)
      }
      else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get meals failed, return a 404 Not Found error
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get meals succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}