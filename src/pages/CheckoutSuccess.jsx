import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order will be delivered soon.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}