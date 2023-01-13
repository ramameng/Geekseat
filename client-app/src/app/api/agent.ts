import axios, { AxiosError, AxiosResponse } from "axios";
import { VillagesFormValues } from "../model/villages";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          throw data;
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          return "Not Found";
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        if (
          data[0].hasOwnProperty("code") &&
          data[0].hasOwnProperty("description")
        ) {
          const modalStateErrors = [];
          for (const key in data) {
            if (data[key].description) {
              modalStateErrors.push(data[key].description);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 403:
        if (status === 403) {
          return "Forbidden";
        }
        break;
      case 404:
        return "Not Found";
      case 500:
        if (data !== undefined) throw data;
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Menus = {
  calculate: (villages: VillagesFormValues) =>
    requests.post<unknown>("/calculates", villages),
};

const agent = {
  Menus,
};

export default agent;
