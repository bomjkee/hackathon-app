import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkUserRegistration, registerUser } from '../api/users';
import { UserRegistrationForm } from '../types/schemas';

// Ключи запросов для React Query
export const authKeys = {
  all: ['auth'] as const,
  registration: () => [...authKeys.all, 'registration'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Хук для проверки регистрации пользователя
 */
export const useCheckRegistration = () => {
  return useQuery({
    queryKey: authKeys.registration(),
    queryFn: checkUserRegistration,
    retry: 1,
    staleTime: 60 * 1000, // 1 минута
  });
};

/**
 * Хук для регистрации пользователя
 */
export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: UserRegistrationForm) => registerUser(userData),
    onSuccess: () => {
      // Инвалидируем запрос регистрации, чтобы обновить статус авторизации
      queryClient.invalidateQueries({ queryKey: authKeys.registration() });
    },
    onError: (error: Error) => {
      console.error('Ошибка при регистрации:', error);
    }
  });
}; 