import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {AxiosRequestConfig} from "axios";

const Error = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized, onRequestError): AxiosInstance => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true
  }
  const api: AxiosInstance = axios.create(axiosConfig);
  const onSuccess = (response: AxiosResponse) => response;
  const onFail = (err: AxiosError) => {
    const {response} = err;

    if(response.status === Error.UNAUTHORIZED) {
      onUnauthorized(response.status);
      throw err;
    }

    onRequestError(response.status);
    throw err;
  }

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}
