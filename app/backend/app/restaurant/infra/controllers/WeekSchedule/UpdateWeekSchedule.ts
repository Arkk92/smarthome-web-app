import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";

import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { IUpdateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/UpdateWeekSchedule";
import { IUpdateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/UpdateWeekSchedule";
import { IController } from "../IController";
import { IHttpRequest } from "@/presentation/http/helpers/IHttpRequest";
import { WeekSchedule } from "@/restaurant/domain/entities/WeekSchedule";

/**
 * Controller for handling requests to update a weekSchedule.
 */
export class UpdateWeekScheduleController implements IController {
  /**
   * Updates an instance of UpdateWeekScheduleController.
   * @param updateWeekScheduleUseCase The use case for creating a weekSchedule.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private updateWeekScheduleUseCase: IUpdateWeekScheduleUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to update a weekSchedule.
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
      const entityKeys = WeekSchedule.getEntityKeys().filter((key) => key !== "id");

      if (
        pathStringParams.includes("id") &&
        bodyParams.some((item) => entityKeys.includes(item))
      ) {
        const id = (httpRequest.path as { id: string }).id;
        const data = httpRequest.body as IUpdateWeekScheduleRequestDTO;
        // Execute the update weekSchedule use case
        response = await this.updateWeekScheduleUseCase.execute(id, data);
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Update weekSchedule failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Update weekSchedule succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
