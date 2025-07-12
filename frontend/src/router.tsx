import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import AdminHome from './pages/AdminHome';
import Search from './pages/Search';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AddItem from './pages/AddItem';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><RoleBasedRoute /></ProtectedRoute>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/search',
    element: <ProtectedRoute><Search /></ProtectedRoute>,
  },
  {
    path: '/browse',
    element: <ProtectedRoute><Browse /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '/product/:id',
    element: <ProtectedRoute><ProductDetail /></ProtectedRoute>,
  },
  {
    path: '/add-item',
    element: <ProtectedRoute><AddItem /></ProtectedRoute>,
  },

]);
