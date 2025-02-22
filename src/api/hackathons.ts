import { type Hackathon, type HackathonList, HackathonListSchema, HackathonSchema } from "../types/hackathon";
import { createAPI } from "./api";

const api = createAPI();

export const getHackathonList = async (): Promise<HackathonList> => {
    try { 
        const response = await api.get<HackathonList>('/hackathons');
        return HackathonListSchema.parse(response.data)
    } catch (error) {
        console.error(`Ошибка при получении списка хакатонов: ${error}`);
        throw error;
    }
};


export const getHackathon = async (id: number): Promise<Hackathon> => {
    try {
        const response = await api.get<Hackathon>(`/hackathons/${id}`);
        return HackathonSchema.parse(response.data);
    } catch (error) {
        console.error(`Ошибка при получении хакатона с ID ${id}:`, error);
        throw error;
    }
};