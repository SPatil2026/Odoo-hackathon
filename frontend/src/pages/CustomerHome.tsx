import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiSearch, HiBell } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';
import apiService from '../services/api';

const categories = [
  "Women's Wear", "Men's Wear", 'Kids Wear', 'Accessories', 'Outerwear', 'Footwear'
];

const CustomerHome = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiService.getItems();
        if (response.success) {
          setItems(response.items);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm p-4 flex items-center justify-between z-10">
        <button className="p-2">
          <HiMenu className="w-6 h-6 text-primary-text" />
        </button>
        <h1 className="font-bold text-lg text-primary-text">ReWear</h1>
        <div className="flex items-center space-x-4">
          <Link to="/search" className="p-2">
            <HiSearch className="w-6 h-6 text-primary-text" />
          </Link>
          <button className="p-2">
            <HiBell className="w-6 h-6 text-primary-text" />
          </button>
          <button onClick={logout} className="text-sm text-red-500">
            Logout
          </button>
        </div>
      </header>

      <main className="pt-20 px-4">
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search items or categories"
            className="w-full p-3 rounded-full border border-gray-300 bg-gray-50 text-primary-text placeholder-secondary-text shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-accent"
          />
        </div>

        <section className="mt-6">
          <h2 className="font-semibold text-lg text-primary-text mb-3">Categories</h2>
          <div className="flex overflow-x-auto pb-4 space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-primary-accent text-white text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {user && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-primary-text">Welcome, {user.name}!</p>
            <p className="text-secondary-text text-sm">Points: {user.points}</p>
          </div>
        )}

        <section className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg text-primary-text">All Items</h2>
            <Link to="/add-item" className="text-primary-accent text-sm">+ Add Item</Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    {item.images[0] ? (
                      <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      'No Image'
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-primary-text text-sm">{item.title}</h3>
                    <p className="text-secondary-text text-xs">{item.condition}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CustomerHome;