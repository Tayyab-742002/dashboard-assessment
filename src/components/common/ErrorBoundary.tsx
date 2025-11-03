import { Component, type ReactNode } from "react";
type Props = {
  children: ReactNode;
  fallback?: (error: unknown, reset: () => void) => ReactNode;
};

type State = { hasError: boolean; error: unknown };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: unknown, Info: unknown) {
    console.error(error, Info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback)
        return this.props.fallback(this.state.error, this.reset);
      return (
        <div className="rounded-md border border-red-400 bg-red-300 p-4 text-sm text-red-700">
          <p className="font-semibold">
            Something went wrong loading this section.
          </p>
          <button className="mt-2 underline" onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
