import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Page } from '../../components/Page/Page';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import { useCheckRegistration } from '../../hooks/useAuth';
import './StartPage.css';

export const StartPage: FC = () => {
  const navigate = useNavigate();
  const { data: registration, isLoading, error } = useCheckRegistration();

  // Перенаправляем на хакатоны, если пользователь зарегистрирован
  useEffect(() => {
    if (registration?.is_registered) {
      navigate('/hackathons');
    }
  }, [registration, navigate]);

  // Обработчик кнопки "Начать"
  const handleStart = () => {
    navigate('/registration');
  };

  // Показываем загрузку во время проверки регистрации
  if (isLoading) {
    return <LoaderScreen message="Проверка аккаунта..." />;
  }

  // Показываем приветственный экран для незарегистрированных пользователей
  return (
    <Page back={false}>
      <div className="start-page">
        <div className="gradient-overlay" />
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
        <motion.div
          className="start-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="start-title">
              Хакатоны РТУ МИРЭА
            </h1>

            <p className="start-description">
              Участвуйте в хакатонах, создавайте команды и воплощайте свои идеи в жизнь
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="start-button-container"
          >
            <button
              onClick={handleStart}
              className="start-button"
            >
              Начать
            </button>
          </motion.div>

          {error && (
            <ErrorMessage
              onRetry={() => window.location.reload()}
              message="Произошла ошибка при проверке регистрации. Попробуйте снова."
            />
          )}
        </motion.div>
      </div>
    </Page>
  );
}; 