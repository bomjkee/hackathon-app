import React, { Component, ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Произошла ошибка в приложении:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Произошла ошибка</h1>
          <p>Что-то пошло не так в приложении.</p>
          <details>
            <summary>Подробности ошибки</summary>
            <p>{this.state.error?.message}</p>
            <p>{this.state.error?.stack}</p>
          </details>
          <button 
            className="reset-button"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Попробовать снова
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 