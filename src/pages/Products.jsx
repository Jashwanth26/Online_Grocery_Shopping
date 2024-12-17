import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]); // Store products
  const [categories, setCategories] = useState(['All']); // Store categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category

  // Fetch data from the API
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        setProducts(data.products);
        setCategories(['All', ...data.categories]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.type === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 ">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 s">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
