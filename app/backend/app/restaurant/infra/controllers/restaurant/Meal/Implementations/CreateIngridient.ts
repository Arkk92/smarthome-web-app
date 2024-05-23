import { IController } from "../../../IController";
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { ResponseDTO } from "@/restaurant/domain/dtos/Response";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { ICreateIngridientUseCase } from "@/restaurant/application/useCases/Ingridient/CreateIngridient";
import { ICreateIngridientRequestDTO } from "@/restaurant/domain/dtos/Ingridient/CreateIngridient";
import { IHttpRequest } from "@/presentation/http/helpers/IHttpRequest";

/**
 * Controller for handling requests to create a ingridient.
 */
export class CreateIngridientController implements IController {
  /**
   * Creates an instance of CreateIngridientController.
   * @param createIngridientCase The use case for creating a ingridient.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private createIngridientCase: ICreateIngridientUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to create a ingridient.
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
        bodyParams.includes("quantity") &&
        bodyParams.includes("apiUri")
      ) {
        // Extract ingridient creation data from the request body
        const createIngridientRequestDTO = httpRequest.body as ICreateIngridientRequestDTO;

        // Execute the create ingridient use case
        response = await this.createIngridientCase.execute(createIngridientRequestDTO);
      } else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        // Create ingridient failed, return a 400 Bad Request error
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      // Create ingridient succeeded, return a 201 Created response
      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
