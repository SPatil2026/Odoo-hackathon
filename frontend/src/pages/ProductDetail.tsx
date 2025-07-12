import { useState, useEffect } from 'react';
import { HiArrowLeft, HiShare, HiHeart } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { Item } from '../types';
import apiService from '../services/api';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        const response = await apiService.getItem(id);
        if (response.success) {
          setItem(response.item);
        }
      } catch (error) {
        console.error('Failed to fetch item:', error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center">Item not found</div>;
  }
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between bg-white shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <HiArrowLeft className="w-6 h-6 text-primary-text" />
        </button>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <HiShare className="w-6 h-6 text-primary-text" />
          </button>
          <button className="p-2">
            <HiHeart className="w-6 h-6 text-primary-text" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Image Gallery */}
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
          {item.images[0] ? (
            <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            'No Image Available'
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 bg-white">
          <h1 className="text-xl font-bold text-primary-text mb-2">
            {item.title}
          </h1>
          
          <p className="text-primary-text text-base leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Swap/Request Button */}
          <button className="w-full px-6 py-3 rounded-full bg-primary-accent text-white font-bold text-lg">
            Request to Swap
          </button>
        </div>

        {/* Item Details */}
        <div className="mt-4 p-4 bg-white">
          <h2 className="font-semibold text-lg text-primary-text mb-3">
            Item Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary-text">Condition</span>
              <span className="font-medium text-primary-text">{item.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Size</span>
              <span className="font-medium text-primary-text">{item.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Category</span>
              <span className="font-medium text-primary-text">{item.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Type</span>
              <span className="font-medium text-primary-text">{item.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Status</span>
              <span className="font-medium text-primary-text capitalize">{item.status}</span>
            </div>
          </div>
        </div>

        {/* Listing Details */}
        <div className="mt-4 p-4 bg-white">
          <h2 className="font-semibold text-lg text-primary-text mb-3">
            Listing Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary-text">Listed On</span>
              <span className="font-medium text-primary-text">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Approved</span>
              <span className="font-medium text-primary-text">{item.approved ? 'Yes' : 'Pending'}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mt-4 p-4 bg-white">
            <h2 className="font-semibold text-lg text-primary-text mb-3">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
