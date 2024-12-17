// Checkout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import DeliveryAddressForm from '../components/DeliveryAddressForm';
import PaymentForm from '../components/PaymentForm';

export default function Checkout() {
  const { checkoutStep, setCheckoutStep } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkoutStep) {
      setCheckoutStep('address');
    }
  }, [checkoutStep, setCheckoutStep]);

  const renderStep = () => {
    switch (checkoutStep) {
      case 'address':
        return <DeliveryAddressForm />;
      case 'payment':
        return <PaymentForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <Step number={1} title="Address" active={checkoutStep === 'address'} completed={checkoutStep === 'payment'} />
            <Step number={2} title="Payment" active={checkoutStep === 'payment'} completed={false} />
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}

function Step({ number, title, active, completed }) {
  return (
    <div className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          completed ? 'bg-primary text-white' : active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span className={`ml-2 ${active ? 'text-primary font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
}
