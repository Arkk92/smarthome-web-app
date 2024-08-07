import { HttpErrors } from "@/presentation/http/helpers/implementations/HttpErrors";
import { HttpSuccess } from "@/presentation/http/helpers/implementations/HttpSuccess";
import { IHttpErrors } from "@/presentation/http/helpers/IHttpErrors";
import { IHttpSuccess } from "@/presentation/http/helpers/IHttpSuccess";
import { IHttpResponse } from "@/presentation/http/helpers/IHttpResponse";
import { HttpRequest } from "@/presentation/http/helpers/implementations/HttpRequest";
import { HttpResponse } from "@/presentation/http/helpers/implementations/HttpResponse";
import { IController } from "../IController";
import { IGetAllMealUseCase } from "@/restaurant/application/useCases/Meal/GetAllMeal";

/**
 * Controller for handling requests to get all meals.
 */
export class GetAllMealController implements IController {
  /**
   * Creates an instance of GetMealController.
   * @param getAllMealUseCase The use case for getting all meals.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllMealUseCase: IGetAllMealUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get all meals.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error;
    let response;
    
    // Execute the get all meals use case
    response = await this.getAllMealUseCase.execute();
    

    if (!response.success) {
      // Get all meals failed, return a 404 Not Found error
      error = this.httpErrors.error_404();
      return new HttpResponse(error.statusCode, response.data);
    }

    // Get all meals succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }

    
  
}
