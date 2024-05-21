import { IGetAllMealUseCase } from "@/restaurant/application/useCases/Meal/GetAllMeal"
import { IController } from "../../../IController"
import { HttpErrors } from "@/presentation/helpers/implementations/HttpErrors"
import { HttpSuccess } from "@/presentation/helpers/implementations/HttpSuccess"
import { IHttpErrors } from "@/presentation/helpers/IHttpErrors"
import { IHttpSuccess } from "@/presentation/helpers/IHttpSuccess"
import { IHttpResponse } from "@/presentation/helpers/IHttpResponse"
import { HttpRequest } from "@/presentation/helpers/implementations/HttpRequest"
import { HttpResponse } from "@/presentation/helpers/implementations/HttpResponse"


/**
 * Controller for handling requests to get all meals.
 */
export class GetMealController implements IController {
  /**
   * Creates an instance of GetMealController.
   * @param getAllMealUseCase The use case for getting all meals.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllMealUseCase: IGetAllMealUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to get all meals.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validate query parameters
    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryStringParams = Object.keys(httpRequest.query)

      if (queryStringParams.includes('page')) {
        const page = (httpRequest.query as { page: string }).page

        // Execute the get all meals use case
        response = await this.getAllMealUseCase.execute(Number(page))
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get all meals failed, return a 404 Not Found error
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get all meals succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}