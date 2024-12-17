import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState('address');

  const updateDeliveryAddress = async (address) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage');
        alert('Please login to continue');
        return;
      }

      // Post address to the server
      const response = await axios.post(
        'http://localhost:8000/customer/address',
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Address updated successfully:', response.data);
      setDeliveryAddress(address); // Update local state with the address
      setCheckoutStep('payment'); // Move to payment step
    } catch (err) {
      console.error('Error updating address:', err.message);
      alert('Failed to update address. Please try again.');
    }
  };

  const updatePaymentMethod = (payment) => {
    setPaymentMethod(payment);
  };

  const resetCheckout = () => {
    setDeliveryAddress(null);
    setPaymentMethod(null);
    setCheckoutStep('address');
  };

  return (
    <CheckoutContext.Provider
      value={{
        deliveryAddress,
        paymentMethod,
        checkoutStep,
        setCheckoutStep,
        updateDeliveryAddress,
        updatePaymentMethod,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
