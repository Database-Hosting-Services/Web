import { Component } from "react";
import PropTypes from "prop-types";
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

/**
 * Button component with redirect functionality
 */
const RedirectButton = ({ to, children }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} className="pulse-button">
      {children}
    </button>
  );
};

RedirectButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Router Error component to handle errors from React Router
 */
const RouterError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Unknown error occurred";
  let statusText = "";
  let status = "";

  if (isRouteErrorResponse(error)) {
    // This is a special error response from React Router
    errorMessage = error.data?.message || error.statusText;
    statusText = error.statusText;
    status = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="error-container">
      <div className="error-card">
        <h1 className="error-title">
          {status ? `${status} - ${statusText || "Error"}` : "Oops!"}
        </h1>
        <p className="error-message">{errorMessage}</p>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="pulse-button"
          >
            Go to Dashboard
          </button>

          <div className="flex justify-center space-x-4 mt-2">
            <button
              onClick={() => navigate(-1)}
              className="text-sm px-4 py-1.5 bg-tertiary/30 text-gray-300 rounded-md hover:bg-tertiary/50 transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-1.5 bg-tertiary/30 text-gray-300 rounded-md hover:bg-tertiary/50 transition-all duration-300"
            >
              Reload
            </button>
          </div>
        </div>

        <span className="typing-effect">
          We'll get you back on track<span className="sr-only">.</span>
        </span>
      </div>
    </div>
  );
};

/**
 * Error Boundary component to catch JavaScript errors anywhere in the child component tree
 */
class ErrorBoundaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-card">
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">
              The application encountered an error
            </p>

            <div className="my-5">
              <RedirectButton to="/dashboard">Go to Dashboard</RedirectButton>
            </div>

            {(this.state.error || this.state.errorInfo) && (
              <details className="mt-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <summary className="text-highlight/80 cursor-pointer hover:text-highlight transition-colors duration-200 text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Technical details
                </summary>
                <div className="mt-3">
                  {this.state.error && (
                    <div className="error-stack">
                      {this.state.error.toString()}
                    </div>
                  )}

                  {this.state.errorInfo && (
                    <div className="error-stack mt-2 text-xs font-mono">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </div>
              </details>
            )}

            <span className="typing-effect">
              We'll get you back on track<span className="sr-only">.</span>
            </span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundaryComponent.propTypes = {
  children: PropTypes.node,
};

/**
 * Error Boundary wrapper that provides the navigate function to the error UI
 */
const ErrorBoundary = ({ children }) => {
  return <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export { RouterError };
export default ErrorBoundary;
