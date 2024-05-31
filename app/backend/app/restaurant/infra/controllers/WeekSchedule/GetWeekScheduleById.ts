import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors"
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess"
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors"
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess"
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse"
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest"
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse"
import { IController } from "../IController"
import { IGetWeekScheduleByIdUseCase } from "@/restaurant/application/useCases/WeekSchedule/GetWeekScheduleById"


/**
 * Controller for handling requests to get weekSchedules.
 */
export class GetWeekScheduleByIdController implements IController {
  /**
   * Creates an instance of GetWeekScheduleController.
   * @param getWeekScheduleUseCase The use case for getting weekSchedules.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getWeekScheduleUseCase: IGetWeekScheduleByIdUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to get weekSchedules.
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
        // Execute the get weekSchedules use case
        response = await this.getWeekScheduleUseCase.execute(id)
      }
      else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get weekSchedules failed, return a 404 Not Found error
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get weekSchedules succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}