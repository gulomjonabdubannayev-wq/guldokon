import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, Shield, Star, ChevronRight, Flower } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const popular = products.filter(p => p.isPopular).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const discounted = products.filter(p => p.discount).slice(0, 4);

  const reviews = [
    { name: 'Dilnoza M.', text: 'Juda chiroyli gullar! Turmush o\'rtoq uchun buyurtma bergandim, juda xursand bo\'ldi. Yetkazib berish tez va sifatli.', rating: 5 },
    { name: 'Sardor K.', text: 'Onamning tug\'ilgan kuniga pion buyurtma qildim. Gullar juda yangi va chiroyli edi. Rahmat GULZOR!', rating: 5 },
    { name: 'Nodira R.', text: 'Har doim shu do\'kondan olaman. Narxlari ham, sifati ham zo\'r. Yetkazib berish vaqtida keladi.', rating: 5 },
    { name: 'Bobur A.', text: 'To\'yimiz uchun gul bezak buyurtma qildik. Hamma narsa mukammal edi. Tavsiya qilaman!', rating: 5 },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=800&fit=crop"
            alt="Gullar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/50 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 leading-tight">
              Sevimli insoningizni gullar bilan xursand qiling!
            </h1>
            <p className="text-lg text-green-100 mb-8">
              O'zbekiston bo'ylab eng sifatli gullar. Tez va ishonchli yetkazib berish.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-all shadow-lg"
              >
                Gullarni ko'rish
              </Link>
              <Link
                to="/cart"
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
              >
                Buyurtma berish
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Tez yetkazish</h3>
                <p className="text-sm text-gray-500">2 soat ichida</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Flower className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Yangi gullar</h3>
                <p className="text-sm text-gray-500">Har kuni yangi</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Kafolat</h3>
                <p className="text-sm text-gray-500">100% sifat</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">24/7</h3>
                <p className="text-sm text-gray-500">Buyurtma qabul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 font-serif">Mashhur gullar</h2>
              <p className="text-gray-500 mt-1">Eng ko'p sotib olinadigan gullar</p>
            </div>
            <Link to="/catalog" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium">
              Barchasi <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popular.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 font-serif">Yangi kelgan gullar</h2>
              <p className="text-gray-500 mt-1">Eng so'nggi qo'shilgan gullar</p>
            </div>
            <Link to="/catalog?sort=newest" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium">
              Barchasi <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 font-serif">🔥 Chegirmadagi gullar</h2>
              <p className="text-gray-500 mt-1">Maxsus narxlar bilan</p>
            </div>
            <Link to="/catalog?sort=discount" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium">
              Barchasi <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {discounted.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 font-serif text-center mb-12">Mijozlar fikrlari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
                <p className="font-semibold text-gray-800">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold font-serif mb-4">Yetkazib berish xizmati</h2>
                <p className="text-green-100 mb-6">
                  O'zbekiston bo'ylab barcha viloyatlarga tez va ishonchli yetkazib berish. 
                  Toshkent shahri ichida 2 soat ichida yetkazib beramiz.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
                    <span>Toshkent shahri: 2 soat ichida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
                    <span>Toshkent viloyati: 3-4 soat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
                    <span>Boshqa viloyatlar: 1 kun ichida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
                    <span>Bepul yetkazish 300 000 so'mdan ortiq buyurtmalarga</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <Link
                  to="/catalog"
                  className="inline-block px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all shadow-lg text-lg"
                >
                  Hoziroq buyurtma bering!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
