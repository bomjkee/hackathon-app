import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import { motion } from 'framer-motion';
import { Page } from '../../components/Page/Page';
import { useHackathonDetail } from '../../hooks/useHackathons';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { formatDate } from '../../utils/formatDate';
import './HackathonDetailPage.css';

export const HackathonDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: hackathon, isLoading, error, refetch } = useHackathonDetail(id ? parseInt(id) : 0);

  const handleFindTeam = () => {
    navigate('/teams');
  };

  return (
    <Page back={true}>
        {isLoading ? (
          <LoaderScreen message="Загрузка информации о хакатоне..." />
        ) : error ? (

            <ErrorMessage
              message="Не удалось загрузить информацию о хакатоне. Пожалуйста, попробуйте позже."
              onRetry={refetch}
            />
        ) : hackathon ? (
          <motion.div 
            className="hackathon-detail-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >

              <h1 className="hackathon-detail-title">{hackathon.name}</h1>

              <h2 className="hackathon-detail-section-title">О хакатоне</h2>
              <p className="hackathon-detail-description">{hackathon.start_description}</p>
              <p className="hackathon-detail-description">{hackathon.description}</p>


              <h2 className="hackathon-detail-section-title">Даты проведения</h2>
              <div className="hackathon-detail-dates">
                <div className="hackathon-detail-date">
                  <span className="hackathon-detail-date-label">Начало:</span>
                  <span className="hackathon-detail-date-value">
                    {formatDate(hackathon.start_date || null)}
                  </span>
                </div>
                <div className="hackathon-detail-date">
                  <span className="hackathon-detail-date-label">Окончание:</span>
                  <span className="hackathon-detail-date-value">
                    {formatDate(hackathon.end_date || null)}
                  </span>
                </div>
              </div>

              <h2 className="hackathon-detail-section-title">Информация</h2>
              <div className="hackathon-detail-info-list">
                <div className="hackathon-detail-info-item">
                  <span className="hackathon-detail-info-label">Макс. размер команды:</span>
                  <span className="hackathon-detail-info-value">{hackathon.max_members} человек</span>
                </div>
              </div>

              <button onClick={handleFindTeam} className="find-team-button">
                Найти команду
              </button>
          </motion.div>
        ) : (
            <ErrorMessage 
            message="Хакатон не найден"
            onRetry={() => navigate('/hackathons')}
            retryButtonText="Вернуться к списку"
            />
        )}
    </Page>
  );
}; 