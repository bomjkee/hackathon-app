
import { type TeamWithMembers, type TeamList, TeamListSchema, TeamWithMembersSchema } from "../types/team";
import { createAPI } from "./api";

const api = createAPI();

export const getTeamList = async (): Promise<TeamList> => {
    try {
        const response = await api.get<TeamList>('/teams');
        return TeamListSchema.parse(response.data);
    } catch (error) {
        console.error(`Произошла ошибка при получении команд: ${error}`);
        throw error;
    }
}


export const getTeamWithMembers = async (id: number): Promise<TeamWithMembers> => {
    try {
        const response = await api.get<TeamWithMembers>(`/teams/${id}`);
        return TeamWithMembersSchema.parse(response.data)
    } catch (error) {
        console.error(`Произошла ошибка при получении команд: ${error}`);
        throw error;
    }
}

