"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Knowledge graph error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 p-4">
            <p className="text-muted-foreground text-sm text-center">
              Failed to load knowledge graph. Please refresh the page.
            </p>
            {this.state.error && (
              <p className="text-xs text-muted-foreground/80 max-w-md truncate" title={this.state.error.message}>
                {this.state.error.message}
              </p>
            )}
          </div>
        )
      );
    }
    return this.props.children;
  }
}
