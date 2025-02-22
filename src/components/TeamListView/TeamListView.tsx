import { FC } from "react"
import { Team, TeamList } from "../../types/team"
import { Link } from "../Link/Link";

import './TeamListView.css'

interface TeamListViewProps {
    teamList: TeamList
}

export const TeamListView: FC<TeamListViewProps> = ({ teamList }) => {
    return (
        <ul className="team-list">
            {teamList.map((team: Team) => (
                <li key={team.id} className="team-list__item">
                    <Link to={`/teams/${team.id}`}>{team.name}</Link>
                </li>
            ))}
        </ul>
    );
}