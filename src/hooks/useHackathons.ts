import { useQuery } from '@tanstack/react-query';
import { getAllHackathons, getHackathonById } from '../api/hackathons';
import { Hackathons, HackathonInfo } from '../types/schemas';

// Ключи запросов для React Query
export const HACKATHONS_KEYS = {
  all: ['hackathons'] as const,
  detail: (id: number) => [...HACKATHONS_KEYS.all, 'detail', id] as const,
};

// Хук для получения всех хакатонов
export const useHackathons = () => {
  return useQuery<Hackathons>({
    queryKey: ['hackathons'],
    queryFn: getAllHackathons,
  });
};

// Хук для получения детальной информации о хакатоне
export const useHackathonDetail = (id: number) => {
  return useQuery<HackathonInfo>({
    queryKey: HACKATHONS_KEYS.detail(id),
    queryFn: () => getHackathonById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false,
  });
}; 