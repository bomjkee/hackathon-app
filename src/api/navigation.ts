import { ComponentType } from "react";
import { IndexPage } from "../pages/IndexPage/IndexPage";
import { ThemeParamsPage } from "../pages/ThemeParamsPage";
import { InitDataPage } from "../pages/InitDataPage";
import { HackathonListPage } from "../pages/HackathonListPage/HackathonListPage";
import { HackathonPage } from "../pages/HackathonPage/HackathonPage";
import { TeamListPage } from "../pages/TeamListPage/TeamListPage";
import { TeamPage } from "../pages/TeamPage/TeamPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: '/', Component: IndexPage },
    { path: '/init-data', Component: InitDataPage, title: 'Init Data' },
    { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
    { path: '/hackathons', Component: HackathonListPage, title: "Хакатоны"},
    { path: '/hackathons/:id', Component: HackathonPage, title: "Просмотр хакатона"},
    { path: '/teams', Component: TeamListPage, title: "Просмотр команд"},
    { path: '/teams/:id', Component: TeamPage, title: "Просмотр команды"}
];
