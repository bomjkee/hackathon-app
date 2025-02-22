import { FC } from 'react'
import { useQuery } from '@tanstack/react-query';

import { TeamList } from '../../types/team';
import { getTeamList } from '../../api/teams';
import { queryClient } from '../../api/queryClient';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/Error/ErrorMessage';
import { Page } from '../../components/Page';
import { TeamListView } from '../../components/TeamListView/TeamListView';


export const TeamListPage: FC = () => {
    const teamListQuery = useQuery<TeamList, Error>({
        queryFn: async () => await getTeamList(),
        queryKey: ["teams"],
    }, queryClient);

    let content;
    
    switch (teamListQuery.status) {
        case "pending":
            content = <Loader />;
            break;
        case "error":
            content =  <ErrorMessage message="Не удалось получить доступ к командам" onRetry={teamListQuery.refetch} />
            break;
        case "success":
            content = <TeamListView teamList={teamListQuery.data} />
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