import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-pink-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sevimlilar ro'yxati bo'sh</h2>
        <p className="text-gray-500 mb-6">Yoqtirgan gullaringizni ♥ belgisi orqali qo'shing</p>
        <Link to="/catalog" className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-medium">
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-serif">Sevimlilar ({favorites.length})</h1>
        <button onClick={clearFavorites} className="text-sm text-red-500 hover:text-red-600">
          Barchasini o'chirish
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 hover:text-green-600 line-clamp-1">
                {product.name}
              </Link>
              <p className="text-lg font-bold text-green-700 mt-1">{formatPrice(product.price)}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  <ShoppingCart className="w-4 h-4" /> Savatga
                </button>
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="p-2 border border-gray-200 rounded-lg text-red-400 hover:text-red-600 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
