import axios from "axios";
import type { AxiosInstance } from "axios";
import type { IngridientInterface } from "@/apps/restaurant/domain/entities/Ingridient";
import type { PaginationDTO } from "@/apps/restaurant/domain/dtos/Pagination";

class IngredientApi {
  private _client: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this._client = apiClient;
  }

  async fetchAllIngredients(): Promise<IngridientInterface[]> {
    
    try {
      const response = await this._client.get<PaginationDTO>("/ingridient/all");
      return response.data.body as IngridientInterface[];
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

  async createIngredient(model: IngridientInterface): Promise<IngridientInterface> {
    try {
      const response = await this._client.post<IngridientInterface>(
        "/ingridient",
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

  async updateIngredient(model: Partial<IngridientInterface>): Promise<IngridientInterface> {
    try {
      const response = await this._client.patch<IngridientInterface>(
        "/ingridient/update/id/"+model.id,
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

  async deleteIngredientById(id: string) {
    try{
      const response = await this._client.delete("/ingridient/delete/id/"+id)
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

export default IngredientApi;
