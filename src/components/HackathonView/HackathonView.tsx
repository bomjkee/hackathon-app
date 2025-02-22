import { FC } from 'react'
import { type Hackathon } from '../../types/hackathon'
import { formatDate } from '../../utils/formatDate';

import './HackathonView.css'

interface HackathonProps {
    hackathon: Hackathon;
}

export const HackathonView: FC<HackathonProps> = ({ hackathon }) => {
    
    return (
        <div>
            <h2>{hackathon.name}</h2>
            <p>{hackathon.description}</p>
            <p>Максимальное количество участников: {hackathon.max_members}</p>
            <p>Дата начала: {formatDate(hackathon.start_date)}</p>
            <p>Дата окончания: {formatDate(hackathon.end_date)}</p>
        </div>
    );
};