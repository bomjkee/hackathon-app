import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../../components/Page/Page';
import { useHackathons } from '../../hooks/useHackathons';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Hackathon } from '../../types/schemas';
import './HackathonsPage.css';

export const HackathonsPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const navigate = useNavigate();
  const { data: hackathons, isLoading, error, refetch } = useHackathons();

  const handleHackathonClick = (id: number) => {
    navigate(`/hackathons/${id}`);
  };

  const filteredAndSortedHackathons = hackathons 
    ? hackathons
        .filter(hackathon => {
          // Фильтрация по поисковому запросу
          if (searchTerm && !hackathon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
          return true;
        })
        .sort((a, b) => {
          // Сортировка
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } 
          return 0;
        })
    : [];

  return (
    <Page back={false}>
        <motion.h2 
          className="hackathons-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Хакатоны
        </motion.h2>
        
        {/* Фильтры и поиск */}
        <motion.div 
          className="hackathons-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="search-container">
            <Input
              placeholder="Поиск хакатонов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
              className="sort-select"
            >
              <option value="date">По дате (сначала новые)</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              className="hackathons-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner size="m" />
              <p>Загрузка хакатонов...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              className="hackathons-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorMessage 
                message={error.message || "Не удалось загрузить хакатоны"}
                onRetry={() => refetch()}
              />
            </motion.div>
          ) : filteredAndSortedHackathons.length === 0 ? (
            <motion.div 
              key="empty"
              className="hackathons-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>{searchTerm ? 'Хакатоны не найдены по вашему запросу' : 'Хакатоны не найдены'}</p>
              {searchTerm && (
                <Button size="s" onClick={() => setSearchTerm('')}>
                  Сбросить поиск
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="hackathons"
              className="hackathons-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredAndSortedHackathons.map((hackathon: Hackathon, index: number) => (
                <motion.div
                  key={hackathon.id}
                  className="hackathon-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * Math.min(index, 10) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleHackathonClick(hackathon.id)}
                >
                  <h2 className="hackathon-name">{hackathon.name}</h2>
                  <p className="hackathon-description">{hackathon.start_description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
    </Page>
  );
}; 