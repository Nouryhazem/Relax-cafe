import React, { Component, ErrorInfo, ReactNode } from 'react';
import { PauseMark } from '../brand/PauseMark';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully handle in production without leaking internal sensitive logs
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center bg-[#1B0F0A] text-[#F3E9DA]">
          <div className="p-4 rounded-full bg-[#3B1F14]/70 border border-[#B8924E]/40 mb-4 shadow-xl">
            <PauseMark size="md" color="#B8924E" />
          </div>
          <h2 className="font-messiri text-2xl sm:text-3xl font-bold text-[#F3E9DA] mb-2">
            لحظة هدوء… حدث أمر غير متوقع
          </h2>
          <p className="text-sm text-[#F3E9DA]/70 max-w-md mx-auto mb-6 leading-relaxed">
            Relax Café مصمم لتجربة رايقة. بإمكانك إعادة تحميل الصفحة لاستئناف تصفح الدور السابع والمنيو.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B8924E] text-[#1B0F0A] font-medium text-sm hover:bg-[#F3E9DA] transition-colors shadow-lg active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة التحميل · Refresh</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
