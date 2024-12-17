import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function ProductCard({ product }) {
  const { addToCart} = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const toggleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id); // Remove product from wishlist
    } else {
      addToWishlist(product); // Add product to wishlist
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative">
      {/* Heart Icon Button for Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Toggle Wishlist"
      >
        {isInWishlist(product._id) ? (
          <HeartSolid className="h-6 w-6 text-red-500" /> // Filled heart if in wishlist
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" /> // Outline heart if not in wishlist
        )}
      </button>

      {/* Product Image */}
      <img
        src={product.banner}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
        
        {/* Price and Stock */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors"
          aria-label="Add to Cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
