import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { type TeamWithMembers } from '../../types/team';
import { queryClient } from '../../api/queryClient';
import { getTeamWithMembers } from '../../api/teams';
import { ErrorMessage } from '../../components/Error/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { TeamView } from '../../components/TeamView/TeamView';
import { Page } from '../../components/Page';

export const TeamPage: FC = () => {
    const { id: teamIdParam } = useParams<{ id: string }>();

    const teamId = teamIdParam ? parseInt(teamIdParam, 10) : null;

    if (teamId === null || isNaN(teamId)) {
        return <ErrorMessage message="Некорректный ID хакатона" />;
    }

    const teamQuery = useQuery<TeamWithMembers, Error>({
        queryFn: async () => await getTeamWithMembers(teamId),
        queryKey: ["team, teamId"]
    }, queryClient)

    let content: ReactNode;

    switch (teamQuery.status) {
        case "pending":
            content = <Loader />;
            break;
        case "error":
            content = <ErrorMessage
                message={`Не удалось найти команду: ${teamQuery.error?.message}`}
                onRetry={teamQuery.refetch}
            />;
            break;
        case "success":
            content = <TeamView teamWithMembers={teamQuery.data} />
            break;
        default:
            content = null;
    }
    
    return (
        <Page>
            {content}
        </Page>
    )
};