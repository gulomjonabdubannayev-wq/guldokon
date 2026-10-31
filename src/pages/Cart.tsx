import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Savatingiz hozircha bo'sh</h2>
        <p className="text-gray-500 mb-6">Gullar katalogidan tanlab, savatga qo'shing</p>
        <Link to="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium">
          Katalogga o'tish <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 font-serif mb-8">Savat ({totalItems} ta mahsulot)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-semibold text-gray-800 hover:text-green-600 line-clamp-1">
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-green-700">{formatPrice(item.product.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Buyurtma xulosasi</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar ({totalItems} ta)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish</span>
                <span>{totalPrice >= 300000 ? "Bepul" : formatPrice(30000)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Jami</span>
                <span className="text-green-700">{formatPrice(totalPrice + (totalPrice >= 300000 ? 0 : 30000))}</span>
              </div>
            </div>
            {totalPrice < 300000 && (
              <p className="text-sm text-amber-600 mb-4">
                💡 300 000 so'mdan ortiq buyurtmaga yetkazib berish bepul!
              </p>
            )}
            <Link
              to="/checkout"
              className="block w-full text-center py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Buyurtmani rasmiylashtirish
            </Link>
            <Link to="/catalog" className="block text-center mt-3 text-green-600 hover:text-green-700 text-sm">
              ← Xaridni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
