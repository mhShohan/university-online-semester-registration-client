import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRoutesProps) => {
  const { user, loading } = { user: true, loading: false };

  const location = useLocation();

  if (loading) {
    return <h1>loading</h1>;
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
