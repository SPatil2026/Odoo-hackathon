import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AddItem from './pages/AddItem';
import Admin from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/add-item',
    element: <AddItem />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);
