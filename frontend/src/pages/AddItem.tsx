import { useState } from 'react';
import { HiArrowLeft, HiCamera } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Women's Wear", "Men's Wear", 'Kids Wear', 'Accessories', 'Outerwear', 'Footwear'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Other'];

const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair'];

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    brand: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement item listing logic
    navigate('/home');
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
        {/* Image Upload */}
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
          <HiCamera className="w-8 h-8 mb-2" />
          <p className="text-sm">Add Images</p>
          <p className="text-xs text-secondary-text mt-1">Up to 5 images</p>
        </div>

        {/* Item Name */}
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent resize-none"
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
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
        >
          <option value="">Select Condition</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>

        {/* Brand */}
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-primary-accent text-white font-bold hover:bg-green-600 transition-colors duration-200 mt-6"
        >
          List Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
