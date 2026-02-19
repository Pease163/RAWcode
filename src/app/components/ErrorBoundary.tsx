import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1
              className="text-6xl font-bold text-[#CCFF00] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ошибка
            </h1>
            <p className="text-[#D4D4D0] text-lg mb-8">
              Что-то пошло не так. Попробуйте обновить страницу.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-[#CCFF00] text-[#0F0F11] rounded-full font-bold hover:bg-[#FF3B00] hover:text-white transition-all duration-300"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
