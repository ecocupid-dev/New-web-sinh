import { apiWithoutToken, appConfigs } from "@/config";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${appConfigs.baseURL}/api`,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 30000, // 30 seconds,
});

export const setToken = async (token: string) => {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
};

const getUrl = (config: AxiosRequestConfig) => {
  if (config && config.baseURL && config.url) {
    return config.url.replace(config.baseURL, "");
  }
  return config.url || "";
};

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let newConfig = { ...config };
    const token = Cookies.get("token");

    const configUrl = newConfig.url;

    if (configUrl) {
      if (apiWithoutToken.find((api) => api.match(configUrl))) {
        delete newConfig.headers["Authorization"];
      }
    }

    if (!newConfig.headers["Authorization"] && token) {
      newConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    // console.log(
    //   `%c ${newConfig.method?.toUpperCase()} - ${getUrl(newConfig)}:`,
    //   "color: #0086b3; font-weight: bold",
    //   newConfig
    // );

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(
    //   `%c ${response?.status} - ${getUrl(response?.config)}:`,
    //   "color: #008000; font-weight: bold",
    //   response
    // );
    return response;
  },
  (error) => {
    // console.log(
    //   `%c ${error?.response?.status} - ${getUrl(error?.response?.config)}:`,
    //   "color: #a71d5d; font-weight: bold",
    //   error?.response
    // );
    return Promise.reject(error.response.data);
  }
);

export default instance;
