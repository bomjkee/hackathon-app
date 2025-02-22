import { format } from 'date-fns';


export const formatDate = (timestamp: number | null): string => {
    if (!timestamp) {
        return 'не указана'; 
    }
    try {
        const date = new Date(timestamp * 1000);
        return format(date, 'dd.MM.yyyy HH:mm');
    } catch (e) {
        console.error("Error formatting date:", e);
        return 'ошибка форматирования';
    }
};
