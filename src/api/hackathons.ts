import apiClient, { handleApiError, validateResponseStatus } from './api';
import { 
  HackathonsSchema,
  HackathonInfoSchema,
  type HackathonInfo, 
  type Hackathons } from '../types/schemas';

/**
 * Получение списка всех хакатонов
 */
export const getAllHackathons = async (): Promise<Hackathons> => {
  try {
    const response = await apiClient.get<Hackathons>('/hackathons');
    validateResponseStatus(response);
    return HackathonsSchema.parse(response.data);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Получение информации о конкретном хакатоне по ID
 */
export const getHackathonById = async (id: number): Promise<HackathonInfo> => {
  try {
    const response = await apiClient.get<HackathonInfo>(`/hackathons/${id}`);
    validateResponseStatus(response);
    return HackathonInfoSchema.parse(response.data);
  } catch (error) {
    throw handleApiError(error);
  }
};