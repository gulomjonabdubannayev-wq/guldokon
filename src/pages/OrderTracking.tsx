import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusSteps = [
  { name: 'Buyurtma qabul qilindi', icon: Package, color: 'blue' },
  { name: 'Tayyorlanmoqda', icon: Clock, color: 'amber' },
  { name: 'Yetkazib beruvchiga topshirildi', icon: Truck, color: 'purple' },
  { name: 'Yo\'lda', icon: Truck, color: 'orange' },
  { name: 'Yetkazib berildi', icon: CheckCircle, color: 'green' },
];

export default function OrderTracking() {
  const { orders, getOrderById, getOrdersByPhone } = useOrders();
  const [searchPhone, setSearchPhone] = useState('');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [foundOrders, setFoundOrders] = useState<typeof orders>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    let results: typeof orders = [];
    if (searchOrderId) {
      const order = getOrderById(searchOrderId);
      if (order) results = [order];
    } else if (searchPhone) {
      results = getOrdersByPhone(searchPhone);
    }
    setFoundOrders(results);
  };

  const getStatusIndex = (status: string) => statusSteps.findIndex(s => s.name === status);

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 font-serif mb-8">Buyurtmani kuzatish</h1>

      {/* Search Form */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <p className="text-gray-600 mb-4">Buyurtmangiz holatini bilish uchun telefon raqami yoki buyurtma raqamini kiriting:</p>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buyurtma raqami (masalan: GZ-LX123)"
            value={searchOrderId}
            onChange={e => { setSearchOrderId(e.target.value); setSearchPhone(''); }}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />
          <span className="text-gray-400 self-center hidden md:block">yoki</span>
          <input
            type="tel"
            placeholder="+998 XX XXX XX XX"
            value={searchPhone}
            onChange={e => { setSearchPhone(e.target.value); setSearchOrderId(''); }}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
            <Search className="w-4 h-4" /> Qidirish
          </button>
        </form>
      </div>

      {/* Results */}
      {searched && foundOrders.length === 0 && (
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Buyurtma topilmadi</h3>
          <p className="text-gray-500">Telefon raqami yoki buyurtma raqamini tekshiring</p>
        </div>
      )}

      {foundOrders.map(order => {
        const statusIdx = getStatusIndex(order.status);
        const isCancelled = order.status === 'Bekor qilindi';

        return (
          <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Buyurtma raqami</p>
                <p className="text-xl font-bold text-green-700">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Jami summa</p>
                <p className="text-xl font-bold text-gray-800">{formatPrice(order.totalPrice)}</p>
              </div>
            </div>

            {/* Status Progress */}
            {!isCancelled ? (
              <div className="mb-6">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${(statusIdx / (statusSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                  {statusSteps.map((step, i) => {
                    const Icon = step.icon;
                    const active = i <= statusIdx;
                    return (
                      <div key={step.name} className="relative flex flex-col items-center z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-xs mt-2 text-center max-w-[80px] ${active ? 'text-green-700 font-medium' : 'text-gray-400'}`}>
                          {step.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="font-semibold text-red-700">Buyurtma bekor qilingan</p>
                  <p className="text-sm text-red-500">Batafsil ma'lumot uchun operator bilan bog'laning</p>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Mijoz:</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500">Telefon:</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Manzil:</p>
                <p className="font-medium">{order.region}, {order.district}, {order.address}</p>
              </div>
              <div>
                <p className="text-gray-500">Yetkazib berish:</p>
                <p className="font-medium">{order.deliveryDate}, {order.deliveryTime}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Mahsulotlar:</p>
              {order.items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 py-1">
                  <img src={item.product.image} alt="" className="w-8 h-8 rounded object-cover" />
                  <span className="text-sm text-gray-600">{item.product.name} × {item.quantity}</span>
                  <span className="text-sm font-medium ml-auto">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
