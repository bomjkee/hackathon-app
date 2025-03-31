import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Page.css';

interface PageProps {
    children: ReactNode;
    back?: boolean;
    title?: string;
    subtitle?: string;
}

export const Page = ({ children, back = false, title, subtitle }: PageProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Показываем кнопку "Назад" только если back=true
        if (back) {
            // Показываем кнопку "Назад" в Telegram WebApp
            backButton.show();

            // Обработка нажатия на кнопку "Назад"
            const handleBackButtonClick = () => {
                navigate(-1); // Переходим на предыдущую страницу
            };

            backButton.onClick(handleBackButtonClick);

            // Очистка при размонтировании компонента
            return () => {
                backButton.offClick(handleBackButtonClick);
                backButton.hide();
            };
        } else {
            // Скрываем кнопку "Назад" если back=false
            backButton.hide();
        }
    }, [back, navigate]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3
                }}
                className="page"
            >
                {(title || subtitle) && (
                    <div className="page-header">
                        {title && <h1 className="page-title">{title}</h1>}
                        {subtitle && <p className="page-subtitle">{subtitle}</p>}
                    </div>
                )}
                <div className="page-content">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}; 