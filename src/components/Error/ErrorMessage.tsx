import { FC } from 'react';

import './ErrorMessage.css'

interface ErrorMessageProps {
    message: string;
    variant?: 'normal' | 'warning' | 'error';
    onRetry?: () => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, variant = 'normal', onRetry }) => {
    let styleClass = 'error-message';
    switch (variant) {
        case 'warning':
            styleClass += ' error-message-warning';
            break;
        case 'error':
            styleClass += ' error-message-error';
            break;
        default:
            break;
    }

    return (
        <div className={styleClass}>
            <p>{message}</p>
            {onRetry && (
                <button onClick={onRetry}>
                    Повторить попытку
                </button>
            )}
        </div>
    );
};