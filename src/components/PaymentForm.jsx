import { useState } from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm() {
  const { updatePaymentMethod, resetCheckout } = useCheckout();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updatePaymentMethod(paymentDetails);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Clear cart and checkout state
    clearCart();
    resetCheckout();
    // Navigate to success page
    navigate('/checkout/success');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              placeholder="123"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
}