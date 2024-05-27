import { IDeleteIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/DeleteIngridient"
import { IController } from "../IController"
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors"
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess"
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors"
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess"
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse"
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest"
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse"


/**
 * Controller for handling requests to delete a ingridient.
 */
export class DeleteIngridientController implements IController {
  /**
   * Creates an instance of DeleteIngridientController.
   * @param deleteIngridientUseCase The use case for deleting a ingridient.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteIngridientUseCase: IDeleteIngridientUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to delete a ingridient.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error

    // Extract ingridient ID from path parameters
    const id = (httpRequest.path as { id: string }).id

    // Execute the delete ingridient use case
    const response = await this.deleteIngridientUseCase.execute(id)

    if (!response.success) {
      // Delete ingridient failed, return a 400 Bad Request error
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete ingridient succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}