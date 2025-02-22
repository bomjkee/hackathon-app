import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { getHackathonList } from "../../api/hackathons";
import { Loader } from "../../components/Loader/Loader";
import { queryClient } from "../../api/queryClient";
import { HackathonListView } from "../../components/HackathonListView/HackathonListView";
import { ErrorMessage } from "../../components/Error/ErrorMessage";
import { HackathonList } from "../../types/hackathon";
import { Page } from "../../components/Page";


export const HackathonListPage: FC = () => {

    const hackathonListQuery = useQuery<HackathonList, Error>({
        queryFn: async () => await getHackathonList(),
        queryKey: ["hackathons"],
    }, queryClient);

    let content;
    
    switch (hackathonListQuery.status) {
        case "pending":
            content = <Loader />;
            break;
        case "error":
            content =  <ErrorMessage message="Не удалось получить доступ к хакатонам" onRetry={hackathonListQuery.refetch} />
            break;
        case "success":
            content = <HackathonListView hackathonList={hackathonListQuery.data} />
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