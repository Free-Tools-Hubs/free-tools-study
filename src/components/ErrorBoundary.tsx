import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-2xl border border-red-100 dark:border-red-900/30 text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black">Something went wrong.</h1>
              <p className="text-slate-500">We encountered an unexpected error while preparing your study materials.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="bg-primary text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-primary-hover transition-all"
              >
                <RefreshCcw className="w-5 h-5" /> Reload Page
              </button>
              <Link 
                to="/"
                onClick={() => this.setState({ hasError: false })}
                className="bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" /> Return Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
