import { FC } from "react";
import { Link } from "../Link/Link";

import './FooterTabs.css'

export const FooterTabs: FC = () => {
    return (
        <nav className="footer">
            <Link to="/hackathons" className="footer__item">Хакатоны</Link>
            <Link to="/teams" className="footer__item">Команды</Link>
            <Link to="/get_me" className="footer__item">Профиль</Link>
        </nav>
    );
}