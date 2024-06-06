import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { ICreateWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/CreateWeekSchedule";
import { ICreateWeekScheduleRequestDTO } from "@/restaurant/domain/dtos/WeekSchedule/CreateWeekSchedule";
import { IController } from "../IController";
import { IHttpRequest } from "@/presentation/http/helpers/IHttpRequest";
import { IMealInWithConstrainsDTO } from "@/restaurant/domain/dtos/Meal/MealInWithConstrains";
import { Week } from "@/restaurant/domain/valueObj/Week";

/**
 * Controller for handling requests to create a weekSchedule.
 */
export class CreateWeekScheduleController implements IController {
  /**
   * Creates an instance of CreateWeekScheduleController.
   * @param createWeekScheduleCase The use case for creating a weekSchedule.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private createWeekScheduleCase: ICreateWeekScheduleUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to create a weekSchedule.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: ResponseDTO;

    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathStringParams = Object.keys(httpRequest.path);
      const bodyParams = Object.keys(httpRequest.body);

      if (
        pathStringParams.includes("babyAllowed") &&
        bodyParams.includes("period")
      ) {
        // Extract weekSchedule constrains from the request path
        const babyAllowed = JSON.parse((httpRequest.path as {babyAllowed: string}).babyAllowed)
        const mealWithConstrainsDTO: IMealInWithConstrainsDTO = {
          babyAllowed: Boolean(babyAllowed)
        }
        // Extract weekSchedule creation data from the request body
        const createWeekScheduleRequestDTO =
          httpRequest.body as ICreateWeekScheduleRequestDTO;
        
        // Create date instances from string
        const period = (httpRequest.body as {period: {start: string, end:  string}}).period
        createWeekScheduleRequestDTO.period = new Week({
          start: new Date(period.start),
          end: new Date(period.end),
        });
        // Execute the create weekSchedule use case
        response = await this.createWeekScheduleCase.execute(
          mealWithConstrainsDTO,
          createWeekScheduleRequestDTO
        );
      } else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Create weekSchedule failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Create weekSchedule succeeded, return a 201 Created response
      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
