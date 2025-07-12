import { HiStar } from 'react-icons/hi';

const mockListings = [
  { id: 1, title: 'Denim Jacket', image: null },
  { id: 2, title: 'Summer Dress', image: null },
  { id: 3, title: 'Sneakers', image: null },
];

const mockRequests = [
  { id: 1, title: 'Winter Coat', image: null },
  { id: 2, title: 'Hiking Boots', image: null },
];

const mockReviews = [
  { id: 1, rating: 5, text: 'Great exchange!' },
  { id: 2, rating: 4, text: 'Very responsive' },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg mb-4">
            User
          </div>
          
          {/* User Name */}
          <h1 className="text-xl font-bold text-primary-text">John Doe</h1>
          
          {/* User Stats */}
          <div className="flex justify-center gap-6 mt-4 text-center">
            <div>
              <p className="font-semibold text-primary-text">5</p>
              <p className="text-sm text-secondary-text">Items Listed</p>
            </div>
            <div>
              <p className="font-semibold text-primary-text">10</p>
              <p className="text-sm text-secondary-text">Exchanges</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <p className="font-semibold text-primary-text mr-1">4.5</p>
                <HiStar className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-sm text-secondary-text">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Listings */}
      <section className="mt-6 px-4">
        <h2 className="font-semibold text-lg text-primary-text mb-3">My Listings</h2>
        <div className="flex overflow-x-auto pb-4 gap-4">
          {mockListings.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                Image
              </div>
              <p className="p-2 text-sm font-medium text-primary-text line-clamp-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* My Requests */}
      <section className="mt-6 px-4">
        <h2 className="font-semibold text-lg text-primary-text mb-3">My Requests</h2>
        <div className="flex overflow-x-auto pb-4 gap-4">
          {mockRequests.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                Image
              </div>
              <p className="p-2 text-sm font-medium text-primary-text line-clamp-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* My Reviews */}
      <section className="mt-6 px-4">
        <h2 className="font-semibold text-lg text-primary-text mb-3">My Reviews</h2>
        <div className="flex overflow-x-auto pb-4 gap-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-32 bg-white rounded-lg shadow-sm p-3"
            >
              <div className="flex items-center mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <HiStar key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-secondary-text line-clamp-2">{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
