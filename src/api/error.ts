import { ErrorResponse, type Error } from '../types/schemas';
import axios, { AxiosError } from 'axios';

export const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }

    return {
      code: 'NETWORK_ERROR',
      message: axiosError.message || 'Ошибка сети',
    };
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Произошла неизвестная ошибка',
  };
}; 