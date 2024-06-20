import axios from 'axios';
import type { AxiosInstance } from 'axios'
import type { MealInterface } from '@/apps/restaurant/domain/entities/Meal';

class MealApi {

  _client: AxiosInstance;

  constructor(apiClient: AxiosInstance){
    this._client = apiClient;
  }

  async fetchAllMeals():  Promise<MealInterface[]> {
    let mealList: MealInterface[] = [];
    let responseStatus: number = 200;
    let pageNumber: number = 0;
    try {
      while(responseStatus == 200){
        const response = await this._client.get<MealInterface[]>('/meal/all', {
          params: {
            page: pageNumber
          }
        });
        if(response.status == 200){
          mealList = mealList.concat(response.data)
          pageNumber++;
        }
        responseStatus = response.status;
      }
      return mealList;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        console.error('Axios error:', error.message);
      } else {
        // Handle other errors
        console.error('Unknown error:', error);
      }
      throw error;
    }
  }
}

export default MealApi;