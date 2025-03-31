import apiClient, { handleApiError, validateResponseStatus } from './api';
import {
  UserCheckRegistrationSchema,
  ProfileInfoSchema,
  SuccessResponseSchema,
  type ProfileInfo,
  type SuccessResponse,
  type UserCheckRegistration,
  type UserRegistrationForm,
} from '../types/schemas';

// Проверка регистрации пользователя
export const checkUserRegistration = async (): Promise<UserCheckRegistration> => {
  try {
    const response = await apiClient.get('/register');
    return UserCheckRegistrationSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

// Регистрация пользователя
export const registerUser = async (userData: UserRegistrationForm): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post('/register', userData);
    
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

// Получение профиля пользователя
export const getUserProfile = async (): Promise<ProfileInfo> => {
  try {
    const response = await apiClient.get('/my_profile');
    return ProfileInfoSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};
