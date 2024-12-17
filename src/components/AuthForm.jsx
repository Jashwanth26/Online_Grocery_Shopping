import { useState } from 'react';
import { Navigate } from 'react-router-dom'; // For redirecting
import { useAuth } from '../context/AuthContext'; // Import AuthContext

export default function AuthForm() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth(); // Use the login method from AuthContext
  const [auth, setAuth] = useState(false); // Track authentication state

  // Change handler for form inputs
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Submit handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before submitting

    try {
      await login(data.email, data.password); // Call login function from AuthContext
      setAuth(true); // After successful login, set auth to true
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message)); // Handle login error
    }
  };

  // Redirect to products if authentication is successful
  if (auth) {
    return <Navigate to="/products" />; 
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={changeHandler}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-bold"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Sign Up
        </a>
      </p>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Display error message */}
    </div>
  );
}
