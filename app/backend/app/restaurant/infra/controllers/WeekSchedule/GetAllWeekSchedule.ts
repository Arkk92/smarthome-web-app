import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { IController } from "../IController";
import { IGetAllWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/GetAllWeekSchedule";

/**
 * Controller for handling requests to get all weekSchedules.
 */
export class GetAllWeekScheduleController implements IController {
  /**
   * Creates an instance of GetWeekScheduleController.
   * @param getAllWeekScheduleUseCase The use case for getting all weekSchedules.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllWeekScheduleUseCase: IGetAllWeekScheduleUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all weekSchedules.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error;
    let response;

    // Validate query parameters
    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryStringParams = Object.keys(httpRequest.query);

      if (queryStringParams.includes("page")) {
        const page = (httpRequest.query as { page: string }).page;

        // Execute the get all weekSchedules use case
        response = await this.getAllWeekScheduleUseCase.execute(Number(page));
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Get all weekSchedules failed, return a 404 Not Found error
        error = this.httpErrors.error_404();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Get all weekSchedules succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
