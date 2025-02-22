import { FC } from "react";

import { Page } from "../../components/Page";
import { Link } from "../../components/Link/Link";

export const IndexPage: FC = () => {
    return (
        <Page back={false}>
            <div>Хакатоны РТУ МИРЭА</div>
            <Link to='/hackathons'>Начать</Link>
        </Page>
    );
};