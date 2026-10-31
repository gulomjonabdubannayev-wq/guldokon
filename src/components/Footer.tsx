import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-green-400 rounded-full flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif">GULZOR</span>
            </div>
            <p className="text-green-200 text-sm">O'zbekistondagi eng yaxshi gul do'koni. Sevimli insonlaringizni gullar bilan xursand qiling!</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Sahifalar</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Katalog</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">Sevimlilar</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Savat</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white transition-colors">Buyurtma kuzatish</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategoriyalar</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><Link to="/catalog?category=Atirgullar" className="hover:text-white transition-colors">Atirgullar</Link></li>
              <li><Link to="/catalog?category=Pionlar" className="hover:text-white transition-colors">Pionlar</Link></li>
              <li><Link to="/catalog?category=Orxideyalar" className="hover:text-white transition-colors">Orxideyalar</Link></li>
              <li><Link to="/catalog?category=Aralash guldastalar" className="hover:text-white transition-colors">Aralash guldastalar</Link></li>
              <li><Link to="/catalog?category=Premium guldastalar" className="hover:text-white transition-colors">Premium guldastalar</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Aloqa</h3>
            <ul className="space-y-3 text-green-200 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Toshkent shahri, Amir Temur ko'chasi 15</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Har kuni 08:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300 text-sm">
          <p>© 2024 GULZOR. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
