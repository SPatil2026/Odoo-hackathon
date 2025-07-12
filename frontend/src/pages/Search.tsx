import { useState } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const recentSearches = ['Hoodie', 'Blue Jeans', 'Summer Dress'];
const popularCategories = [
  "Women's wear", "Men's wear", 'Kids wear', 'Accessories', 'Outerwear', 'Footwear'
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Search Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <div className="flex-1 flex items-center bg-gray-50 rounded-full pr-3">
          <input
            type="text"
            placeholder="Search items or categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 bg-transparent text-primary-text placeholder-secondary-text focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <HiX className="w-5 h-5 text-secondary-text" />
            </button>
          )}
        </div>
        <button
          onClick={handleCancel}
          className="ml-3 px-4 py-2 text-primary-accent font-medium"
        >
          Cancel
        </button>
      </div>

      {/* Search Content */}
      <div className="p-4">
        {/* Recent Searches */}
        <section>
          <h2 className="font-semibold text-primary-text text-lg mt-6 mb-3">
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-secondary-text text-sm"
              >
                <HiSearch className="w-4 h-4 mr-1" />
                {search}
              </button>
            ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section>
          <h2 className="font-semibold text-primary-text text-lg mt-6 mb-3">
            Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <button
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-secondary-text text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;
