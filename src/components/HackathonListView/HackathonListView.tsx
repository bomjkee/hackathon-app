import { FC } from "react";
import { type Hackathons, type HackathonList } from "../../types/hackathon";
import { Link } from "../Link/Link";

import './HackathonListView.css'


interface HackathonListProps {
    hackathonList: HackathonList;
}


export const HackathonListView: FC<HackathonListProps> = ({ hackathonList }) => {
    return (          
        <ul className="hackathon-list">
            {hackathonList.map((hackathon: Hackathons) => (
                <li key={hackathon.id} className="hackathon-list__item">
                    <Link to={`/hackathons/${hackathon.id}`}>{hackathon.name}</Link>
                    <p>{hackathon.start_description}</p>
                </li>
            ))}
        </ul>
    );
}