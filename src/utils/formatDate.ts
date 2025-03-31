import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Функция для форматирования временной метки в читаемую строку даты
 * @param timestamp - Временная метка в формате Unix timestamp (секунды) или null
 * @returns Отформатированная строка даты
 */
export const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return 'Дата не указана';
  try {
    // Преобразуем timestamp в миллисекунды для создания объекта Date
    const date = new Date(timestamp * 1000);
    
    // Проверка валидности даты
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return format(date, 'dd MMMM yyyy', { locale: ru });
  } catch (error) {
    console.error('Ошибка при форматировании даты:', error);
    return 'Неверный формат даты';
  }
};


