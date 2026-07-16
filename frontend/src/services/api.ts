import { IPayload } from "@/interfaces/IPayload";
import { LocalStorage } from "@/utils/LocalStorage";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const payload = LocalStorage.getInstance().get<IPayload>("cama-uefs-admin");

    if (payload) {
      config.headers.Authorization = payload.token;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      LocalStorage.getInstance().remove("cama-uefs-admin");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { api };
