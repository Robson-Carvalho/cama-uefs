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

// Create rawApi to avoid interceptor infinite loops
const rawApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      const errorMessage = error.response.data?.message;

      if (errorMessage === "Token expirado") {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = token;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const payload = LocalStorage.getInstance().get<IPayload>("cama-uefs-admin");
        if (payload?.refreshToken) {
          try {
            const { data } = await rawApi.post<IPayload>("/auth/refresh", {
              refreshToken: payload.refreshToken,
            });

            LocalStorage.getInstance().set<IPayload>("cama-uefs-admin", data);

            api.defaults.headers.common["Authorization"] = data.token;
            originalRequest.headers.Authorization = data.token;

            processQueue(null, data.token);

            return api(originalRequest);
          } catch (refreshError: any) {
            processQueue(refreshError, null);

            const refreshMsg =
              refreshError.response?.data?.message || "Sessão expirada. Faça login novamente.";
            LocalStorage.getInstance().remove("cama-uefs-admin");

            // Dispara evento para o provider mostrar o Toast e deslogar
            window.dispatchEvent(new CustomEvent("sessionExpired", { detail: refreshMsg }));

            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export { api };
