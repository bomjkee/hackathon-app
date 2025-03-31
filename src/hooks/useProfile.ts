import { useQuery, useMutation, } from '@tanstack/react-query';
import { getUserProfile } from '../api/users';


// Ключи запросов для React Query
export const profileKeys = {
  all: ['profile'] as const,
  detail: () => [...profileKeys.all, 'detail'] as const,
};

/**
 * Хук для получения профиля пользователя
 */
export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
