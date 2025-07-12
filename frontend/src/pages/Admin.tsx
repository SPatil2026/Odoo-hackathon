import { useState } from 'react';
import { HiX, HiCheck, HiPencil, HiTrash } from 'react-icons/hi';

type Tab = 'users' | 'items' | 'listings';

const mockUsers = [
  { id: 1, name: 'Jane Doe', status: 'active' },
  { id: 2, name: 'John Smith', status: 'active' },
  { id: 3, name: 'Alice Johnson', status: 'disabled' },
];

const mockItems = [
  { id: 1, name: 'Denim Jacket', status: 'listed' },
  { id: 2, name: 'Summer Dress', status: 'pending' },
  { id: 3, name: 'Leather Boots', status: 'exchanged' },
];

const mockListings = [
  { id: 1, item: 'Denim Jacket', status: 'pending' },
  { id: 2, item: 'Summer Dress', status: 'approved' },
  { id: 3, item: 'Leather Boots', status: 'rejected' },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('users');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 flex items-center justify-center bg-white shadow-sm">
        <h1 className="font-bold text-lg text-primary-text">Admin Panel</h1>
      </header>

      {/* Tabs */}
      <div className="p-4">
        <div className="flex w-full bg-gray-100 rounded-lg p-1">
          {(['users', 'items', 'listings'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-primary-accent text-white'
                  : 'text-primary-text hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="ml-3 font-medium text-primary-text">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full">
                    <HiX className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="space-y-3">
            {mockItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Image</span>
                  </div>
                  <span className="ml-3 font-medium text-primary-text">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <HiPencil className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-3">
            {mockListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="font-medium text-primary-text">
                    {listing.item}
                  </span>
                  <span className="ml-2 text-sm text-secondary-text">
                    ({listing.status})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-green-500 hover:bg-green-50 rounded-full">
                    <HiCheck className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
