import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../types/schemas';

// Базовый URL для API
const BASE_URL = '/api';

// Создаем экземпляр Axios с базовыми настройками
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Интерсептор для добавления инициативных данных пользователя Telegram
apiClient.interceptors.request.use((config) => {
  // Получаем данные из Telegram WebApp
  const tgWebApp = (window as any).Telegram?.WebApp;
  
  if (tgWebApp) {
    config.headers['Authorization'] =  `tma ${tgWebApp.initDataRaw}`;
  } else {
    config.headers['Authorization'] =  `tma query_id=AAFjugMwAAAAAGO6AzDtwMz4&user=%7B%22id%22%3A805550691%2C%22first_name%22%3A%22%E5%8C%9A%E3%84%A5%E3%84%96%E3%84%A9%E1%97%AA%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22bomjkee%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FSIl_BF-VFBBmT7XImJOngWVlM5LUe2v0mWIrah8hnJw.svg%22%7D&auth_date=1741641618&signature=-rip8aot3_GFrrnSTC_Cbku1WPY6SBrZBIDA0xEFCh6neeqpHj_CaeUGmO5eOvUbWO8MDO5LwpJhIMuztBEsBw&hash=48e6354937fe36e402a611a1e4bee0750bd3ff3db1090be41c69fa0c0fe056e9`;
  }
  
  return config;
});


export const validateResponseStatus = (response: AxiosResponse) => {
  if (response.status === 200 && response.data['status'] === 'error') {
    throw new Error(response.data['data']['message'] || 'Произошла ошибка при обращении к серверу');
  }
}


// Функция для обработки ошибок API
export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    if (axiosError.response) {
      // Ошибка от сервера
      const errorResponse = axiosError.response.data;
      throw new Error(errorResponse.error?.message || 'Произошла ошибка при обращении к серверу');
    } else if (axiosError.request) {
      // Запрос был сделан, но ответа не получено
      throw new Error('Сервер не отвечает. Проверьте ваше соединение с интернетом.');
    }
  }
  
  // Неизвестная ошибка
  if (error instanceof Error) {
    throw error;
  }
  
  throw new Error('Произошла неизвестная ошибка');
};

export default apiClient;