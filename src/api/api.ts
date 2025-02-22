import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { StatusCodes } from 'http-status-codes';


const BACKEND_URL = 'http://localhost:8080/api';
const REQUEST_TIMEOUT = 5000;


const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];


export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: "/api",
        timeout: REQUEST_TIMEOUT,
    });



    api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const initDataRaw = retrieveLaunchParams();

        if (initDataRaw && config.headers) {
            config.headers['Authorization'] = `tma ${initDataRaw}`;
        }

        return config;
    });


    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response && shouldDisplayError(error.response)) {
                console.error(`Ошибка ${error.response.status}: ${error.response.data}`);
            }
            return Promise.reject(error);
        }
    );

    return api;
};