import { useLaunchParams } from '@telegram-apps/sdk-react';

/**
 * Простой хук для работы с Telegram SDK
 * Предоставляет доступ к базовым параметрам запуска
 */
export function useSDK() {
  // Получаем параметры запуска (launch params)
  const lp = useLaunchParams();
  
  // Определяем платформу и цветовую схему
  const platform = lp.platform || 'unknown';
  const colorScheme = lp.themeParams?.colorScheme as 'light' | 'dark' | null || null;
  
  return {
    platform,
    colorScheme,
  };
} 