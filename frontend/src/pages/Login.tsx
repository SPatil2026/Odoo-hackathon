import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      {/* Logo Placeholder */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-8">
        <span className="text-gray-500 text-sm">ReWear Logo</span>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-accent mb-4"
        />
        
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-primary-accent text-white font-bold hover:bg-green-600 transition-colors duration-200"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          className="block text-center text-secondary-text text-sm mt-2"
        >
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="block w-full p-3 rounded-lg border border-primary-accent text-primary-accent font-bold mt-6 text-center hover:bg-green-50 transition-colors duration-200"
        >
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default Login;
