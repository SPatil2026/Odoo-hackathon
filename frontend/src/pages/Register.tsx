import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = await register(formData.name, formData.email, formData.password, formData.role);
    if (success) {
      navigate('/');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      {/* Logo Placeholder */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-8">
        <span className="text-gray-500 text-sm">ReWear Logo</span>
      </div>

      <div className="w-full max-w-md flex gap-6">
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4 bg-white"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-primary-accent text-white font-bold hover:bg-green-600 transition-colors duration-200"
          >
            Register
          </button>

          <Link
            to="/login"
            className="block text-center text-secondary-text text-sm mt-4"
          >
            Already have an account? Login
          </Link>
        </form>

        {/* Instructions Box */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg text-secondary-text text-sm self-start">
          <p>Please fill in all details for registration and accept our terms & conditions.</p>
          <ul className="list-disc list-inside mt-2">
            <li>Use a valid email address</li>
            <li>Password must be at least 8 characters</li>
            <li>Include special characters for security</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
