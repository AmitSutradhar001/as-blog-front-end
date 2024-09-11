import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const apiService = {
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  get: (url, config = {}) => apiClient.get(url, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
};

export default apiService;
