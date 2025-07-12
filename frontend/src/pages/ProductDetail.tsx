import { HiArrowLeft, HiShare, HiHeart } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';

const mockProduct = {
  id: 1,
  title: 'Vintage Denim Jacket',
  description: 'A classic denim jacket in excellent condition. Perfect for casual wear and easily pairs with any outfit. Minimal wear and tear, all buttons intact.',
  condition: 'Excellent',
  size: 'M',
  brand: 'Levi\'s',
  listedBy: 'Jane Doe',
  listingDate: '2025-07-10',
  images: [],
};

const mockSuggestedItems = [
  { id: 2, title: 'Blue Jeans', condition: 'Very Good' },
  { id: 3, title: 'Denim Shirt', condition: 'Like New' },
  { id: 4, title: 'Jean Shorts', condition: 'Good' },
];

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Use id to fetch product details from API
  console.log(`Fetching product details for id: ${id}`);

  // For now, we'll use mock data
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
          Product Images
        </div>

        {/* Product Info */}
        <div className="p-4 bg-white">
          <h1 className="text-xl font-bold text-primary-text mb-2">
            {mockProduct.title}
          </h1>
          
          <p className="text-primary-text text-base leading-relaxed mb-4">
            {mockProduct.description}
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
              <span className="font-medium text-primary-text">{mockProduct.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Size</span>
              <span className="font-medium text-primary-text">{mockProduct.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Brand</span>
              <span className="font-medium text-primary-text">{mockProduct.brand}</span>
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
              <span className="text-secondary-text">Listed By</span>
              <span className="font-medium text-primary-text">{mockProduct.listedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-text">Listed On</span>
              <span className="font-medium text-primary-text">{mockProduct.listingDate}</span>
            </div>
          </div>
        </div>

        {/* Suggested Items */}
        <div className="mt-4 p-4">
          <h2 className="font-semibold text-lg text-primary-text mb-3">
            Similar Items
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-4">
            {mockSuggestedItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  Image
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-primary-text line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-secondary-text">
                    {item.condition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
