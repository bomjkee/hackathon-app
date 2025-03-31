import { ComponentType } from "react";
import { ThemeParamsPage } from "../pages/ThemeParamsPage";
import { InitDataPage } from "../pages/InitDataPage";
import { TeamPage } from "../pages/TeamPage/TeamPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { HackathonsPage } from "../pages/HackathonsPage/HackathonsPage";
import { TeamsPage } from "../pages/TeamsPage/TeamsPage";
import { HackathonDetailPage } from "../pages/HackathonDetailPage/HackathonDetailPage";
import { CreateTeamPage } from "../pages/CreateTeamPage/CreateTeamPage";
import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";
import { ReactNode } from "react";
import { StartPage } from "../pages/StartPage/StartPage";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: ReactNode;
    requiresAuth?: boolean;
}

const routes: Route[] = [
    // Открытые маршруты
    { path: '/', Component: StartPage, title: "Главная" },
    { path: '/registration', Component: RegistrationPage, title: "Регистрация" },
    
    // Защищенные маршруты (требуют авторизации)
    { path: '/hackathons', Component: HackathonsPage, title: "Хакатоны", requiresAuth: true },
    { path: '/hackathons/:id', Component: HackathonDetailPage, title: "Просмотр хакатона", requiresAuth: true },
    { path: '/teams', Component: TeamsPage, title: "Команды", requiresAuth: true },
    { path: '/teams/create', Component: CreateTeamPage, title: "Создание команды", requiresAuth: true },
    { path: '/teams/:id', Component: TeamPage, title: "Просмотр команды", requiresAuth: true },
    { path: '/profile', Component: ProfilePage, title: "Профиль", requiresAuth: true }
];

export default routes;


