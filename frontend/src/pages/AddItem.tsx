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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 flex items-center justify-start bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <HiArrowLeft className="w-6 h-6 text-primary-text" />
        </button>
        <h1 className="ml-4 font-bold text-lg text-primary-text">Add Item</h1>
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        {/* Image Upload */}
        <label className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
          <HiCamera className="w-8 h-8 mb-2" />
          <p className="text-sm">Add Images</p>
          <p className="text-xs text-secondary-text mt-1">Up to 5 images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {images.length > 0 && (
          <p className="text-sm text-green-600">{images.length} image(s) selected</p>
        )}

        {/* Item Name */}
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent resize-none"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Size */}
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
          required
        >
          <option value="">Select Size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Condition */}
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
          required
        >
          <option value="">Select Condition</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
          required
        >
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        
        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-primary-accent text-white font-bold hover:bg-green-600 transition-colors duration-200 mt-6 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'List Item'}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
