import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate(); // Use navigate for redirecting
  const token = localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsMenuOpen(false); // Close the mobile menu
    navigate('/'); // Redirect to home page or login page after logout
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Vijaya'S Mart</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            {token ? (
              // Show Logout button if the user is logged in
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              // Show Register button if the user is not logged in
              <Link to="/register" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md">
                Register
              </Link>
            )}
            <Link to="/wishlist" className="relative text-gray-700 hover:text-primary px-3 py-2">
              <HeartIcon className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-primary px-3 py-2">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {token ? (
              <button
                onClick={handleLogout} // Combine the logout logic with closing the menu
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            )}
            <Link
              to="/wishlist"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist ({wishlistItems.length})
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
