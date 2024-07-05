import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthenticatedRoute;
