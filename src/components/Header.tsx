import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, Flower2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-green-500 rounded-full flex items-center justify-center">
              <Flower2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-serif bg-gradient-to-r from-green-700 to-pink-600 bg-clip-text text-transparent">
              GULZOR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Bosh sahifa</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Katalog</Link>
            <Link to="/order-tracking" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Buyurtma kuzatish</Link>
            <Link to="/admin" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Admin</Link>
          </nav>

          {/* Search + Icons */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Gul qidirish..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-48 px-3 py-2 border border-gray-200 rounded-l-full text-sm focus:outline-none focus:border-green-500"
              />
              <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded-r-full hover:bg-green-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3">
            <form onSubmit={handleSearch} className="flex mb-3">
              <input
                type="text"
                placeholder="Gul qidirish..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-l-full text-sm focus:outline-none focus:border-green-500"
              />
              <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded-r-full">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Bosh sahifa</Link>
              <Link to="/catalog" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Katalog</Link>
              <Link to="/order-tracking" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Buyurtma kuzatish</Link>
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">Admin panel</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
