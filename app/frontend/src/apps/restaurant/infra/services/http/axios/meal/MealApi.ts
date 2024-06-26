import axios from "axios";
import type { AxiosInstance } from "axios";
import type { MealInterface } from "@/apps/restaurant/domain/entities/Meal";
import type { PaginationDTO } from "@/apps/restaurant/domain/dtos/Pagination";

class MealApi {
  private _client: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this._client = apiClient;
  }

  async fetchAllMeals(): Promise<MealInterface[]> {
    
    try {
      const response = await this._client.get<PaginationDTO>("/meal/all");
      return response.data.body as MealInterface[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error("Axios error:", error);
      } else {
        // Handle other errors
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  async createMeal(model: MealInterface): Promise<MealInterface> {
    try {
      const response = await this._client.post<MealInterface>(
        "/meal",
        model
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error("Axios error:", error.message);
      } else {
        // Handle other errors
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  async updateMeal(model: Partial<MealInterface>): Promise<MealInterface> {
    try {
      const response = await this._client.patch<MealInterface>(
        "/meal/update/id/"+model.id,
        model
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error("Axios error:", error.message);
      } else {
        // Handle other errors
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  async deleteMealById(id: string) {
    try{
      const response = await this._client.delete("/meal/delete/id/"+id)
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error("Axios error:", error.message);
      } else {
        // Handle other errors
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }
}

export default MealApi;
