import { useState, useEffect } from 'react';
import { HiTrash, HiLogout } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';
import apiService from '../services/api';

interface AdminItem extends Item {
  uploader: {
    name: string;
    email: string;
  };
}

const AdminHome = () => {
  const { user, logout } = useAuth();
  const [allItems, setAllItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const response = await apiService.getItems();
      if (response.success) {
        setAllItems(response.items);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item? This will remove it from Cloudinary.')) {
      try {
        const response = await apiService.deleteItem(id);
        if (response.success) {
          await fetchAllItems();
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg text-primary-text">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-secondary-text">Welcome, {user?.name}</span>
          <button onClick={logout} className="flex items-center text-red-500 text-sm">
            <HiLogout className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      </header>

      <main className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary-text mb-2">All Uploaded Items</h2>
          <p className="text-secondary-text text-sm">Manage all items uploaded by customers. You can delete items which will remove them from Cloudinary.</p>
        </div>

        {allItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {allItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.images[0] ? (
                        <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 text-xs">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-text">{item.title}</h3>
                      <p className="text-sm text-secondary-text mt-1">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          Size: {item.size}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item.condition}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Available
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        Uploaded by: {item.uploader.name} ({item.uploader.email})
                      </p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    title="Delete item and remove from Cloudinary"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHome;