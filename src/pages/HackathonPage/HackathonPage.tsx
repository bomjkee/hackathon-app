import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";

import { Hackathon } from "../../types/hackathon";
import { getHackathon } from "../../api/hackathons";
import { queryClient } from "../../api/queryClient";
import { ErrorMessage } from "../../components/Error/ErrorMessage";
import { Loader } from "../../components/Loader/Loader";
import { HackathonView } from "../../components/HackathonView/HackathonView";
import { Page } from "../../components/Page";

export const HackathonPage: FC = () => {
    const { id: hackathonIdParam } = useParams<{ id: string }>();

    const hackathonId = hackathonIdParam ? parseInt(hackathonIdParam, 10) : null;

    if (hackathonId === null || isNaN(hackathonId)) {
        return <ErrorMessage message="Некорректный ID хакатона" />;
    }

    let hackathonQuery = useQuery<Hackathon, Error>({
        queryFn: async () => await getHackathon(hackathonId),
        queryKey: ["hackathon", hackathonId]
    }, queryClient)

    let content: ReactNode;

    switch (hackathonQuery.status) {
        case "pending":
            content = <Loader />;
            break;
        case "success":
            content = <HackathonView hackathon={hackathonQuery.data} />
            break;
        case "error":
            content = <ErrorMessage
                message={`Не удалось найти хакатон: ${hackathonQuery.error?.message}`}
                onRetry={hackathonQuery.refetch}
            />;
            break;
        default:
            content = null;
    }

    return (
        <Page>
            {content}
        </Page>
    );
};

