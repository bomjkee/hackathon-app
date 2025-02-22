import { FC } from "react";
import { TeamWithMembers } from "../../types/team";
import { MemberListView } from "../MemberListView/MemberListView";


interface TeamViewProps {
    teamWithMembers: TeamWithMembers;
}

export const TeamView: FC<TeamViewProps> = ({ teamWithMembers }) => {

    const { team, members } = teamWithMembers;

    return (
        <div>
            <h2>{team.name}</h2>
            {team.description && <p>Описание команды: {team.description}</p>}
            <h3>Участники команды:</h3>
            {members.length > 0 ? (
                <MemberListView memberList={members} />
            ) : (
                <p>Пока нет участников.</p>
            )}
        </div>
    );

};