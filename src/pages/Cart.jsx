import { useCart } from '../context/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();


  console.log("CartItems: ",cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.product.banner}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.product._id, Math.max(1, item.unit - 1))}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.unit}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.unit + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>

              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}