import { Navigate, useLocation } from "react-router-dom"; 

// eslint-disable-next-line react/prop-types
const GuestRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
