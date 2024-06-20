import axios from 'axios';
import type { AxiosInstance } from 'axios'

const apiUrl = import.meta.env.VITE_APP_API_URL as string;

// Create an Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Export the configured Axios instance
export default apiClient;
