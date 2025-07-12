import { useState, useEffect } from 'react';
import { HiArrowLeft, HiSearch, HiFilter, HiX } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { Item } from '../types';
import apiService from '../services/api';

const categories = [
  "Women's Wear", "Men's Wear", 'Kids Wear', 'Accessories', 'Outerwear', 'Footwear'
];

const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair'];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory, selectedCondition, items]);

  const fetchItems = async () => {
    try {
      const response = await apiService.getItems();
      if (response.success) {
        setItems(response.items);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedCondition) {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedCondition('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-soft backdrop-blur-sm bg-white/95 p-4 flex items-center justify-between z-40">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-bold text-xl text-gray-900">Search & Discover</h1>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
        >
          <HiFilter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </header>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="relative mb-6">
          <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for sustainable fashion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-500 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Conditions</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${filteredItems.length} items found`}
          </p>
          {(selectedCategory || selectedCondition) && (
            <div className="flex items-center space-x-2">
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="ml-1">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCondition && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                  {selectedCondition}
                  <button onClick={() => setSelectedCondition('')} className="ml-1">
                    <HiX className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
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

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;