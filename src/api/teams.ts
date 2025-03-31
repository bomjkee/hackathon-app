import apiClient, { handleApiError, validateResponseStatus } from './api';
import { 
  TeamsSchema,
  TeamWithMembersSchema,
  SuccessResponseSchema,
  type Teams,
  type TeamWithMembers,
  type SuccessResponse,
  type TeamCreate,
  type TeamUpdate,
  type InviteCreate,
} from '../types/schemas';

/**
 * Получение списка всех команд
 */
export const getAllTeams = async (): Promise<Teams> => {
  try {
    const response = await apiClient.get<Teams>('/teams/');
    validateResponseStatus(response);
    return TeamsSchema.parse(response.data) ;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Получение информации о команде и ее участниках по ID
 */
export const getTeamById = async (teamId: number): Promise<TeamWithMembers> => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    validateResponseStatus(response);
    return TeamWithMembersSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};


/**
 * Создание новой команды
 */
export const createTeam = async (teamData: TeamCreate): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post('/teams/', teamData);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Обновление информации о команде
 */
export const updateTeam = async (teamId: number | string, teamData: TeamUpdate): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.patch(`/teams/${teamId}`, teamData);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Удаление команды
 */
export const deleteTeam = async (teamId: number | string): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}`);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Присоединение к команде
 */
export const joinTeam = async (teamId: number | string): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/join`);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Выход из команды
 */
export const leaveTeam = async (teamId: number | string): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/leave`);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Приглашение пользователя в команду
 */
export const inviteUserToTeam = async (inviteData: InviteCreate): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post('/teams/invite', inviteData);
    validateResponseStatus(response);
    return SuccessResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Проверка является ли текущий пользователь лидером команды
 */
export const checkTeamLeadership = async (teamId: number | string): Promise<{ is_leader: boolean }> => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/leader`);
    validateResponseStatus(response);
    return response.data;
  } catch (error) {
    console.error('Ошибка при проверке лидерства в команде:', error);
    return { is_leader: false };
  }
};

