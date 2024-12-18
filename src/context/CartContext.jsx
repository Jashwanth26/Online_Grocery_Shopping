import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const showLoginPopup = () => {
    window.alert('Please login to continue.'); // Simple popup message
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local Storage');
        return;
      }
      const response = await axios.get('http://localhost:80/customer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cart);
    } catch (err) {
      console.log('Error fetching from cart', err.message);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart initially when the component mounts
  }, []);

  const addToCart = async (product, qty = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage.');
        showLoginPopup();
        return;
      }

      await axios.put(
        'http://localhost:80/cart',
        { _id: product._id, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update local state manually
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product._id === product._id);

        if (existingItem) {
          // Update quantity if product exists in cart
          return prevItems.map((item) =>
            item.product._id === product._id ? { ...item, unit: item.unit + qty } : item
          );
        } else {
          // Add new product to cart
          return [...prevItems, { product, unit: qty }];
        }
      });
    } catch (err) {
      console.log('Error adding to cart', err.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        showLoginPopup();
        return;
      }

      await axios.delete(`http://localhost:80/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state manually
      setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error('Error removing from cart:', err.message);
    }
  };

  const updateQuantity = async (productId, qty) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage.');
        showLoginPopup();
        return;
      }

      await axios.put(
        'http://localhost:80/cart',
        { _id: productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update local state manually
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId ? { ...item, unit: qty } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err.message);
    }
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.unit,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
