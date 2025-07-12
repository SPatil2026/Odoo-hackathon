import { useState, useEffect } from 'react';
import { HiArrowLeft, HiAdjustments } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Item } from '../types';
import apiService from '../services/api';

const Browse = () => {
  const navigate = useNavigate();
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
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <HiArrowLeft className="w-6 h-6 text-primary-text" />
        </button>
        <h1 className="font-bold text-lg text-primary-text">Browse Catalog</h1>
        <button className="p-2">
          <HiAdjustments className="w-6 h-6 text-primary-text" />
        </button>
      </header>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4">
          {items.map((item) => (
            <button
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden text-left"
            >
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                {item.images[0] ? (
                  <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  'No Image'
                )}
              </div>
              <div className="p-2">
                <h3 className="font-medium text-primary-text text-sm line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-secondary-text text-xs mt-1">
                  Condition: {item.condition}
                </p>
                <p className="text-secondary-text text-xs mt-1 line-clamp-1">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">{item.category} • {item.size}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
