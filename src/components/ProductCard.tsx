import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`"${product.name}" savatga qo'shildi!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleFavorite = () => {
    if (fav) removeFromFavorites(product.id);
    else addToFavorites(product);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('uz-UZ') + " so'm";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">Yangi</span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">-{product.discount}%</span>
          )}
          {product.isPopular && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">Mashhur</span>
          )}
        </div>
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            fav ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-pink-500 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
        </button>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium">Tugagan</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-700">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              added
                ? 'bg-green-100 text-green-700 border border-green-300'
                : product.inStock
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'Qo\'shildi!' : 'Savatga'}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-all"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
