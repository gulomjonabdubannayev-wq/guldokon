import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { regions } from '../data/regions';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', phone: '', region: '', district: '', address: '', comment: '',
    deliveryDate: '', deliveryTime: '', paymentMethod: 'cash'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const deliveryPrice = totalPrice >= 300000 ? 0 : 30000;
  const finalPrice = totalPrice + deliveryPrice;

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  const selectedRegion = regions.find(r => r.name === form.region);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Ism-familiya kiriting';
    if (!form.phone.trim()) errs.phone = 'Telefon raqamini kiriting';
    else if (!/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(form.phone.replace(/\s/g, '')))
      errs.phone = "Noto'g'ri format. +998 XX XXX XX XX";
    if (!form.region) errs.region = 'Viloyatni tanlang';
    if (!form.district) errs.district = 'Tuman/shaharni tanlang';
    if (!form.address.trim()) errs.address = 'Manzilni kiriting';
    if (!form.deliveryDate) errs.deliveryDate = 'Yetkazib berish sanasini tanlang';
    if (!form.deliveryTime) errs.deliveryTime = 'Vaqtni tanlang';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = 'GZ-' + Date.now().toString(36).toUpperCase();
    addOrder({
      id,
      items: [...items],
      customerName: form.name,
      phone: form.phone,
      region: form.region,
      district: form.district,
      address: form.address,
      comment: form.comment,
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
      paymentMethod: form.paymentMethod,
      totalPrice: finalPrice,
      deliveryPrice,
      status: 'Buyurtma qabul qilindi',
      createdAt: new Date().toISOString(),
    });

    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Buyurtma muvaffaqiyatli qabul qilindi!</h2>
        <p className="text-gray-500 mb-2">Sizning buyurtma raqamingiz:</p>
        <p className="text-2xl font-bold text-green-700 mb-6">{orderId}</p>
        <p className="text-gray-600 mb-8">
          Tez orada operatorimiz siz bilan bog'lanadi. Buyurtmangiz holatini "Buyurtma kuzatish" sahifasidan tekshirishingiz mumkin.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/order-tracking" className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 font-medium">
            Buyurtmani kuzatish
          </Link>
          <Link to="/" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 font-medium">
            Bosh sahifaga
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Savat bo'sh</h2>
        <Link to="/catalog" className="text-green-600 hover:text-green-700">← Katalogga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/cart" className="flex items-center gap-1 text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Savatga qaytish
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 font-serif mb-8">Buyurtmani rasmiylashtirish</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Shaxsiy ma'lumotlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ism-familiya *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="Ismingiz"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="+998 90 123 45 67"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Yetkazib berish manzili</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Viloyat *</label>
                  <select
                    value={form.region}
                    onChange={e => setForm({ ...form, region: e.target.value, district: '' })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 bg-white ${errors.region ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Tanlang</option>
                    {regions.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                  </select>
                  {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tuman/Shahar *</label>
                  <select
                    value={form.district}
                    onChange={e => setForm({ ...form, district: e.target.value })}
                    disabled={!selectedRegion}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 bg-white ${errors.district ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Tanlang</option>
                    {selectedRegion?.districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ko'cha va uy raqami *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="Ko'cha, uy, kvartira"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qo'shimcha izoh</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    rows={2}
                    placeholder="Qo'shimcha ma'lumotlar..."
                  />
                </div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Yetkazib berish vaqti</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sana *</label>
                  <input
                    type="date"
                    value={form.deliveryDate}
                    onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 ${errors.deliveryDate ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt *</label>
                  <select
                    value={form.deliveryTime}
                    onChange={e => setForm({ ...form, deliveryTime: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500 bg-white ${errors.deliveryTime ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Tanlang</option>
                    <option value="08:00-10:00">08:00 - 10:00</option>
                    <option value="10:00-12:00">10:00 - 12:00</option>
                    <option value="12:00-14:00">12:00 - 14:00</option>
                    <option value="14:00-16:00">14:00 - 16:00</option>
                    <option value="16:00-18:00">16:00 - 18:00</option>
                    <option value="18:00-20:00">18:00 - 20:00</option>
                    <option value="20:00-22:00">20:00 - 22:00</option>
                  </select>
                  {errors.deliveryTime && <p className="text-red-500 text-xs mt-1">{errors.deliveryTime}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">To'lov usuli</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'cash', label: 'Naqd pul', icon: '💵' },
                  { id: 'click', label: 'Click', icon: '💳' },
                  { id: 'payme', label: 'Payme', icon: '💳' },
                  { id: 'uzum', label: 'Uzum Bank', icon: '🏦' },
                ].map(method => (
                  <label
                    key={method.id}
                    className={`flex flex-col items-center gap-1 p-3 border rounded-xl cursor-pointer transition-all ${
                      form.paymentMethod === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
              {form.paymentMethod !== 'cash' && (
                <p className="text-sm text-amber-600 mt-3">
                  ⚠️ Online to'lov tizimi sozlamalari ulanmagan. Buyurtma qabul qilingandan keyin operator bog'lanadi.
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Buyurtma xulosasi</h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mahsulotlar</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Yetkazib berish</span>
                  <span>{deliveryPrice === 0 ? 'Bepul' : formatPrice(deliveryPrice)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Jami</span>
                  <span className="text-green-700">{formatPrice(finalPrice)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">
                  📍 {form.region || 'Viloyat'}, {form.district || 'Tuman'}
                </p>
                <p className="text-xs text-gray-500 mt-1">📞 {form.phone || 'Telefon'}</p>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors text-lg"
              >
                BUYURTMANI TASDIQLASH
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
