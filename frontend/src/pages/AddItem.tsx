import { useState } from 'react';
import { HiArrowLeft, HiCamera } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const categories = [
  "Women's Wear", "Men's Wear", 'Kids Wear', 'Accessories', 'Outerwear', 'Footwear'
];

const types = [
  'Shirt', 'Pants', 'Dress', 'Jacket', 'Skirt', 'Blouse', 'Jeans', 'T-Shirt', 'Sweater', 'Coat', 'Shorts', 'Other'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Other'];

const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair'];

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Access denied. This feature is for customers only.</p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('tags', formData.tags);
      
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      
      const response = await apiService.createItem(formDataToSend);
      if (response.success) {
        navigate('/');
      } else {
        setError(response.message || 'Failed to create item');
      }
    } catch (error) {
      console.error('Item creation failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-soft backdrop-blur-sm bg-white/95 p-4 flex items-center justify-between z-40">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-bold text-xl text-gray-900">Share Your Style</h1>
        </div>
        <div className="text-sm text-gray-500">Step 1 of 1</div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-3xl shadow-soft p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Item</h2>
            <p className="text-gray-600">Share your pre-loved fashion with the community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Photos</label>
              <label className="w-full h-64 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all group">
                <div className="text-center">
                  <HiCamera className="w-12 h-12 mb-4 mx-auto text-gray-400 group-hover:text-primary-500 transition-colors" />
                  <p className="text-lg font-medium mb-2">Add Photos</p>
                  <p className="text-sm text-gray-500">Upload up to 5 high-quality images</p>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG or WEBP (max 10MB each)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {images.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <p className="text-sm text-primary-600 font-medium">{images.length} image(s) selected</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Title</label>
              <input
                type="text"
                name="title"
                placeholder="What are you sharing?"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Tell us about this item..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select Size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (Optional)</label>
              <input
                type="text"
                name="tags"
                placeholder="vintage, summer, casual (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-soft disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Share Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;