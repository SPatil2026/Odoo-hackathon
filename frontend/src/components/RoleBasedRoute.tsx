import { useAuth } from '../context/AuthContext';
import CustomerHome from '../pages/CustomerHome';
import AdminHome from '../pages/AdminHome';

const RoleBasedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (user?.isAdmin) {
    return <AdminHome />;
  }

  return <CustomerHome />;
};

export default RoleBasedRoute;