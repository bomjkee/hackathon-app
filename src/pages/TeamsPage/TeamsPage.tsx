import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../../components/Page/Page';
import { useTeams } from '../../hooks/useTeams';
import { useHackathons } from '../../hooks/useHackathons';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import { TeamInfo } from '../../types/schemas';
import './TeamsPage.css';

export const TeamsPage: FC = () => {
  const [filter, setFilter] = useState<'all' | 'open'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('recent');
  const [selectedHackathon, setSelectedHackathon] = useState<number | 'all'>('all');
  const navigate = useNavigate();
  const { data: teams, isLoading: isLoadingTeams, error: teamsError, refetch: refetchTeams } = useTeams();
  const { data: hackathons, isLoading: isLoadingHackathons, error: hackathonsError } = useHackathons();

  const handleTeamClick = (id: number) => {
    navigate(`/teams/${id}`);
  };

  const handleCreateTeam = () => {
    navigate('/teams/create');
  };

  const filteredAndSortedTeams = teams 
    ? teams
        .filter(team => {
          // Фильтрация по типу (открытые/все)
          if (filter === 'open' && !team.is_open) return false;
          
          // Фильтрация по хакатону
          if (selectedHackathon !== 'all' && team.hackathon_id !== selectedHackathon) return false;
          
          // Фильтрация по поисковому запросу
          if (searchTerm && !team.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
          
          return true;
        })
        .sort((a, b) => {
          // Сортировка
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } else {
            return b.id - a.id; // По умолчанию сортируем по ID (от большего к меньшему) для имитации по дате создания
          }
        })
    : [];

  const isLoading = isLoadingTeams || isLoadingHackathons;
  const error = teamsError || hackathonsError;

  return (
    <Page back={false}>
        <motion.h1 
          className="teams-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Команды
        </motion.h1>
        
        {/* Кнопка создания команды */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="create-team-container"
        >
          <Button size="m" onClick={handleCreateTeam} className="create-team-button">
            Создать команду
          </Button>
        </motion.div>

        {/* Фильтры и поиск */}
        <motion.div 
          className="teams-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="teams-filter">
            <Button 
              size="m"
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все команды
            </Button>
            <Button 
              size="m"
              className={`filter-button ${filter === 'open' ? 'active' : ''}`}
              onClick={() => setFilter('open')}
            >
              Открытые
            </Button>
          </div>
          
          <div className="search-container">
            <Input
              placeholder="Поиск команд..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-container">
            <select 
              value={selectedHackathon} 
              onChange={(e) => setSelectedHackathon(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="sort-select"
            >
              <option value="all">Все хакатоны</option>
              {hackathons?.map((hackathon) => (
                <option key={hackathon.id} value={hackathon.id}>
                  {hackathon.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sort-container">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'name' | 'recent')}
              className="sort-select"
            >
              <option value="recent">Недавние</option>
              <option value="name">По имени</option>
            </select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoaderScreen message="Загрузка команд..." />
          ) : error ? (
            <ErrorMessage message="Не удалось загрузить команды" onRetry={refetchTeams} />
          ) : filteredAndSortedTeams.length === 0 ? (
            <motion.div 
              key="empty"
              className="teams-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>{searchTerm ? 'Команды не найдены по вашему запросу' : 'Команды не найдены'}</p>
              {searchTerm && (
                <Button size="s" onClick={() => setSearchTerm('')}>
                  Сбросить поиск
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="teams"
              className="teams-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredAndSortedTeams.map((team: TeamInfo, index: number) => (
                <motion.div
                  key={team.id}
                  className="team-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.min(index, 10) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTeamClick(team.id)}
                >
                  <div className="team-card-header">
                    <h2 className="team-name">{team.name}</h2>
                    <span className={`team-type-badge ${team.is_open ? 'open' : 'closed'}`}>
                      {team.is_open ? 'Открытая' : 'Закрытая'}
                    </span>
                  </div>
                  {team.description && (
                    <p className="team-description">{team.description}</p>
                  )}
                  <div className="team-hackathon">
                    {hackathons?.find(h => h.id === team.hackathon_id)?.name || 'Неизвестный хакатон'}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
    </Page>
  );
}; 