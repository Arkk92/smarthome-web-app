import { IDeleteWeekScheduleUseCase } from "@/restaurant/application/useCases/WeekSchedule/DeleteWeekSchedule"
import { IController } from "../IController"
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors"
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess"
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors"
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess"
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse"
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest"
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse"


/**
 * Controller for handling requests to delete a weekSchedule.
 */
export class DeleteWeekScheduleController implements IController {
  /**
   * Creates an instance of DeleteWeekScheduleController.
   * @param deleteWeekScheduleUseCase The use case for deleting a weekSchedule.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteWeekScheduleUseCase: IDeleteWeekScheduleUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to delete a weekSchedule.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error

    // Extract weekSchedule ID from path parameters
    const id = (httpRequest.path as { id: string }).id

    // Execute the delete weekSchedule use case
    const response = await this.deleteWeekScheduleUseCase.execute(id)

    if (!response.success) {
      // Delete weekSchedule failed, return a 400 Bad Request error
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete weekSchedule succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}