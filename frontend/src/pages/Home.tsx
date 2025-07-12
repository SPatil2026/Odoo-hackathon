import { Link } from 'react-router-dom';
import { HiMenu, HiSearch, HiBell } from 'react-icons/hi';

const categories = [
  'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes'
];

const mockListings = [
  { id: 1, title: 'Denim Jacket', condition: 'Like New' },
  { id: 2, title: 'Summer Dress', condition: 'Good' },
  { id: 3, title: 'Leather Boots', condition: 'Excellent' },
  { id: 4, title: 'Casual Shirt', condition: 'Very Good' },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm p-4 flex items-center justify-between z-10">
        <button className="p-2">
          <HiMenu className="w-6 h-6 text-primary-text" />
        </button>
        <h1 className="font-bold text-lg text-primary-text">ReWear</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <HiSearch className="w-6 h-6 text-primary-text" />
          </button>
          <button className="p-2">
            <HiBell className="w-6 h-6 text-primary-text" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4">
        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search items or categories"
            className="w-full p-3 rounded-full border border-gray-300 bg-gray-50 text-primary-text placeholder-secondary-text shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-accent"
          />
        </div>

        {/* Categories Section */}
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
            <button className="flex-shrink-0 px-4 py-2 rounded-full border border-primary-accent text-primary-accent text-sm">
              See All
            </button>
          </div>
        </section>

        {/* Newest Listings */}
        <section className="mt-6">
          <h2 className="font-semibold text-lg text-primary-text mb-3">Newest Listings</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockListings.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  Product Image
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-primary-text text-sm">{item.title}</h3>
                  <p className="text-secondary-text text-xs">{item.condition}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
