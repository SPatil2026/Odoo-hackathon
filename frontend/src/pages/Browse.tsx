import { HiArrowLeft, HiAdjustments } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const mockProducts = [
  { id: 1, title: 'Vintage Denim Jacket', condition: 'Excellent', description: 'Lightly worn, size M' },
  { id: 2, title: 'Summer Floral Dress', condition: 'Like New', description: 'Never worn, size S' },
  { id: 3, title: 'Leather Boots', condition: 'Good', description: 'Some wear, size 39' },
  { id: 4, title: 'Casual White Shirt', condition: 'Very Good', description: 'Cotton blend, size L' },
  { id: 5, title: 'Black Jeans', condition: 'Excellent', description: 'Stretchy fit, size 30' },
  { id: 6, title: 'Knit Sweater', condition: 'Like New', description: 'Wool blend, size M' },
];

const Browse = () => {
  const navigate = useNavigate();

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
      <div className="grid grid-cols-2 gap-4 p-4">
        {mockProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden text-left"
          >
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
              Product Image
            </div>
            <div className="p-2">
              <h3 className="font-medium text-primary-text text-sm line-clamp-1">
                {product.title}
              </h3>
              <p className="text-secondary-text text-xs mt-1">
                Condition: {product.condition}
              </p>
              <p className="text-secondary-text text-xs mt-1 line-clamp-1">
                {product.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Browse;
