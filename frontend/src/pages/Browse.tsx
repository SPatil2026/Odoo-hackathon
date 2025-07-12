import { useState, useEffect } from 'react';
import { HiArrowLeft, HiAdjustments, HiViewGrid, HiViewList, HiHeart } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { Item } from '../types';
import apiService from '../services/api';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
];

const Browse = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [sortedItems, setSortedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    sortItems();
  }, [items, sortBy]);

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

  const sortItems = () => {
    let sorted = [...items];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setSortedItems(sorted);
  };

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedItems.map((item) => (
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{item.condition}</span>
              <span className="text-xs text-gray-500">{item.size}</span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {sortedItems.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          className="flex bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
            {item.images[0] ? (
              <img 
                src={item.images[0].url} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{item.condition}</span>
                  <span className="text-xs text-gray-500">{item.category}</span>
                  <span className="text-xs text-gray-500">Size: {item.size}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HiHeart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-soft backdrop-blur-sm bg-white/95 p-4 flex items-center justify-between z-40">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-bold text-xl text-gray-900">Browse Collection</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <HiViewGrid className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <HiViewList className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
            >
              <HiAdjustments className="w-4 h-4" />
              <span className="text-sm font-medium">Sort</span>
            </button>
            
            {showSortOptions && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[160px] z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortOptions(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === option.value ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${sortedItems.length} items available`}
          </p>
          <div className="text-sm text-gray-500">
            Sorted by: {sortOptions.find(opt => opt.value === sortBy)?.label}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items available</h3>
            <p className="text-gray-500">Check back later for new additions</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? <GridView /> : <ListView />}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;