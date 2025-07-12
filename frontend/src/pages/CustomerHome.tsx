import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiSearch, HiBell, HiPlus, HiHeart } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';
import apiService from '../services/api';

const categories = [
  { name: "Women's Wear", icon: '👗', color: 'bg-pink-100 text-pink-700' },
  { name: "Men's Wear", icon: '👔', color: 'bg-blue-100 text-blue-700' },
  { name: 'Kids Wear', icon: '🧸', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Accessories', icon: '👜', color: 'bg-purple-100 text-purple-700' },
  { name: 'Outerwear', icon: '🧥', color: 'bg-green-100 text-green-700' },
  { name: 'Footwear', icon: '👟', color: 'bg-orange-100 text-orange-700' },
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
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-soft backdrop-blur-sm bg-white/95 p-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HiMenu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-bold text-xl text-gray-900 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">ReWear</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/search" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HiSearch className="w-5 h-5 text-gray-600" />
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <HiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user?.name?.charAt(0)}</span>
          </div>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors px-2">
            Logout
          </button>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="mt-6">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for sustainable fashion..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-500 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <section className="mt-8">
          <h2 className="font-bold text-2xl text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`${category.color} p-4 rounded-2xl text-center hover:scale-105 transition-transform shadow-soft`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {user && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl shadow-soft text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Welcome back, {user.name}! 👋</h3>
                <p className="text-primary-100 mt-1">Ready to find your next sustainable piece?</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">{user.points} Points</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-2xl text-gray-900">Latest Finds</h2>
            <Link 
              to="/add-item" 
              className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors shadow-soft"
            >
              <HiPlus className="w-4 h-4" />
              <span className="font-medium">Add Item</span>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full h-48 bg-gray-100">
                    {item.images[0] ? (
                      <img 
                        src={item.images[0].url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <HiHeart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{item.condition}</span>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
        
        <div className="pb-20"></div>
      </main>
    </div>
  );
};

export default CustomerHome;