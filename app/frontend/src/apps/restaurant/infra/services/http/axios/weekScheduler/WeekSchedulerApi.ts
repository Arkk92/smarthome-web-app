import axios from "axios";
import type { AxiosInstance } from "axios";
import type { WeekScheduleInterface } from "@/apps/restaurant/domain/entities/WeekSchedule";
import type { PaginationDTO } from "@/apps/restaurant/domain/dtos/Pagination";
import { format } from 'date-fns';
import type { Seasons } from "@/apps/restaurant/domain/enums/meal/Seasons";
import type { Week } from "@/apps/restaurant/domain/valueObj/Week";

class WeekSchedulerApi {
  private _client: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this._client = apiClient;
  }

  async fetchAllWeekSchedulers(): Promise<WeekScheduleInterface[]> {
    
    try {
      const response = await this._client.get<PaginationDTO>("/weekSchedule/all");
      return response.data.body as WeekScheduleInterface[];
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

  async fetchWeekSchedulerByDate(date: Date): Promise<WeekScheduleInterface> {
    
    try {
      const dateStr = format(date, 'MM-dd-yyyy')
      const response = await this._client.get<WeekScheduleInterface>("/weekSchedule/date/"+dateStr);
      console.log(response)
      return response.data;
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

  async createWeekScheduler(season: Seasons, babyAllowed: boolean, start: Date): Promise<WeekScheduleInterface> {
    try {
      const end = new Date(start);
      end.setDate(end.getDate()+7);
      const response = await this._client.post<WeekScheduleInterface>(
        "/weekSchedule/season/"+season+"/babyAllowed/"+babyAllowed,
        {
          period: {
            start: format(start, 'MM-dd-yyyy'),
            end: format(end, 'MM-dd-yyyy')
        }}
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

  async updateWeekScheduler(model: Partial<WeekScheduleInterface>): Promise<WeekScheduleInterface> {
    try {
      const response = await this._client.patch<WeekScheduleInterface>(
        "/weekSchedule/update/id/"+model.id,
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

  async deleteWeekSchedulerById(id: string) {
    try{
      const response = await this._client.delete("/weekSchedule/delete/id/"+id)
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

export default WeekSchedulerApi;
