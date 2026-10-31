import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Mahsulot topilmadi</h2>
        <Link to="/catalog" className="mt-4 inline-block text-green-600 hover:text-green-700">← Katalogga qaytish</Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/catalog" className="flex items-center gap-1 text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Katalogga qaytish
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-[400px] md:h-[500px] object-cover" />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Yangi</span>}
            {product.discount && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>}
            {product.isPopular && <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Mashhur</span>}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 font-serif mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">Kategoriya: {product.category}</p>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-green-700">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
              {product.inStock ? 'Mavjud' : 'Tugagan'}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600">Soni:</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-gray-500">= {formatPrice(product.price * quantity)}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                added
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : product.inStock
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? "Savatga qo'shildi!" : "Savatga qo'shish"}
            </button>
            <button
              onClick={() => fav ? removeFromFavorites(product.id) : addToFavorites(product)}
              className={`p-3 rounded-xl border-2 transition-all ${
                fav ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-500 hover:border-pink-300'
              }`}
            >
              <Heart className="w-5 h-5" fill={fav ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-serif mb-6">O'xshash mahsulotlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
