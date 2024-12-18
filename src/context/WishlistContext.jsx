import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  console.log("WishlistItems1: ", wishlistItems);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage.');
          return;
        }
        // GET request to fetch the user's profile (including wishlist)
        const response = await axios.get('http://localhost:80/customer/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response: ", response.data)
               // Set wishlist items from the API response
               setWishlistItems(response.data || []);
              } catch (error) {
                console.error('Error fetching wishlist:', error.message);
              }
            };
        
            fetchWishlist();
          }, []);

  // Function to add an item to the wishlist
  const addToWishlist = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage.');
        return;
      }
      // PUT request to add the product to the wishlist
      const response = await axios.put(
        'http://localhost:80/wishlist',
        { _id: product._id }, // Use _id as required by the backend
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
            'Content-Type': 'application/json',
          },
        }
      );

      // Update local state
      if (response.status === 200) {
        console.log("API Response:", response.data);
        // Update local state if the API call was successful
        setWishlistItems((prevItems) =>
          prevItems.some((item) => item._id === product._id)
            ? prevItems
            : [...prevItems, product] // Only add the product if not already in the wishlist
        );
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage.');
        return;
      }
      // DELETE request to remove the product from the wishlist
      await axios.delete(`http://localhost:80/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      // Update local state
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
      console.log('Product removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error.message);
    }
  };

  // Function to check if a product is in the wishlist
  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item._id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use Wishlist context
export function useWishlist() {
  return useContext(WishlistContext);
}
