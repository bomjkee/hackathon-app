import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTeams, getTeamById, createTeam, joinTeam, leaveTeam, updateTeam, deleteTeam, inviteUserToTeam, checkTeamLeadership } from '../api/teams';
import { TeamCreate, TeamUpdate, TeamWithMembers } from '../types/schemas';

// Ключи запросов для React Query
export const TEAMS_KEYS = {
  all: ['teams'] as const,
  lists: () => [...TEAMS_KEYS.all, 'list'] as const,
  userTeams: () => [...TEAMS_KEYS.all, 'user'] as const,
  detail: (id: number) => [...TEAMS_KEYS.all, 'detail', id.toString()] as const,
  isLeader: (teamId: number) => [...TEAMS_KEYS.all, teamId, 'isLeader'] as const,
};

/**
 * Хук для получения списка всех команд
 */
export const useTeams = () => {
  return useQuery({
    queryKey: TEAMS_KEYS.lists(),
    queryFn: getAllTeams,
    staleTime: 2 * 60 * 1000, // 2 минуты
    refetchOnWindowFocus: false,
  });
};

/**
 * Хук для получения детальной информации о команде
 */
export const useTeamDetail = (teamId: number) => {
  return useQuery({
    queryKey: TEAMS_KEYS.detail(teamId),
    queryFn: () => getTeamById(teamId),
    enabled: teamId > 0,
  });
};

/**
 * Хук для создания новой команды
 */
export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (teamData: TeamCreate) => createTeam(teamData),
    onSuccess: () => {
      // Инвалидируем все запросы списков команд
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.lists() });
      // Инвалидируем также список команд пользователя
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.userTeams() });
    }
  });
};

/**
 * Хук для обновления команды
 */
export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, ...data }: { teamId: number } & TeamUpdate) => 
      updateTeam(teamId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.detail(variables.teamId) });
    },
  });
};

/**
 * Хук для удаления команды
 */
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.all });
    },
  });
};

/**
 * Хук для присоединения к команде
 */
export const useJoinTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => joinTeam(teamId),
    onSuccess: (_, teamId) => {
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.userTeams() });
    },
  });
};

/**
 * Хук для выхода из команды
 */
export const useLeaveTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => leaveTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.all });
    },
  });
};

/**
 * Хук для приглашения пользователя в команду
 */
export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, inviteUserId }: { teamId: number; inviteUserId: number }) => 
      inviteUserToTeam({
        team_id: teamId,
        invite_user_id: inviteUserId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TEAMS_KEYS.detail(variables.teamId) });
    },
  });
};

/**
 * Хук для проверки лидерства в команде
 */
export const useIsTeamLeader = (teamId: number) => {
  return useQuery({
    queryKey: TEAMS_KEYS.isLeader(teamId),
    queryFn: () => checkTeamLeadership(teamId),
    enabled: teamId > 0,
    retry: false,
  });
};
