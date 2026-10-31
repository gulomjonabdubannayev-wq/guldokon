import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { products as initialProducts, categories } from '../data/products';
import { Product, Order } from '../types';
import { Lock, Package, ShoppingCart, DollarSign, Users, TrendingUp, Plus, Trash2, Edit, Eye } from 'lucide-react';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'gulzor2024';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('gulzor_admin') === 'true');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard');
  const { orders, updateOrderStatus } = useOrders();
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gulzor_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_LOGIN && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('gulzor_admin', 'true');
      setLoginError('');
    } else {
      setLoginError("Login yoki parol noto'g'ri");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('gulzor_admin');
  };

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const completedOrders = orders.filter(o => o.status === 'Yetkazib berildi').length;

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin panel</h2>
            <p className="text-gray-500 text-sm mt-1">Boshqaruv paneliga kirish</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Login</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Kirish
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">Login: admin | Parol: gulzor2024</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-serif">Admin panel</h1>
        <button onClick={handleLogout} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm">
          Chiqish
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'dashboard' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <TrendingUp className="w-4 h-4 inline mr-1" /> Statistika
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'orders' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Package className="w-4 h-4 inline mr-1" /> Buyurtmalar ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'products' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ShoppingCart className="w-4 h-4 inline mr-1" /> Mahsulotlar ({productList.length})
        </button>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Umumiy savdo</p>
                  <p className="text-xl font-bold text-gray-800">{formatPrice(totalRevenue)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Buyurtmalar</p>
                  <p className="text-xl font-bold text-gray-800">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mahsulotlar</p>
                  <p className="text-xl font-bold text-gray-800">{productList.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Yetkazilgan</p>
                  <p className="text-xl font-bold text-gray-800">{completedOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <h3 className="text-lg font-bold text-gray-800 mb-4">So'nggi buyurtmalar</h3>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Raqam</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Mijoz</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Summa</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-green-700">{order.id}</td>
                      <td className="px-4 py-3">{order.customerName}</td>
                      <td className="px-4 py-3">{formatPrice(order.totalPrice)}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Hali buyurtmalar yo'q</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-400">Hali buyurtmalar yo'q</div>
          )}
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-bold text-green-700">{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('uz-UZ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatPrice(order.totalPrice)}</p>
                  <p className="text-sm text-gray-500">{order.items.length} ta mahsulot</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Mijoz: <span className="font-medium text-gray-800">{order.customerName}</span></p>
                  <p className="text-gray-500">Telefon: <span className="font-medium text-gray-800">{order.phone}</span></p>
                </div>
                <div>
                  <p className="text-gray-500">Manzil: <span className="font-medium text-gray-800">{order.region}, {order.district}, {order.address}</span></p>
                  <p className="text-gray-500">Vaqt: <span className="font-medium text-gray-800">{order.deliveryDate}, {order.deliveryTime}</span></p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={order.status}
                  onChange={e => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white"
                >
                  <option>Buyurtma qabul qilindi</option>
                  <option>Tayyorlanmoqda</option>
                  <option>Yetkazib beruvchiga topshirildi</option>
                  <option>Yo'lda</option>
                  <option>Yetkazib berildi</option>
                  <option>Bekor qilindi</option>
                </select>
                <span className="text-sm text-gray-500">To'lov: {order.paymentMethod === 'cash' ? 'Naqd' : order.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products */}
      {activeTab === 'products' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Barcha mahsulotlar</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              <Plus className="w-4 h-4" /> Yangi qo'shish
            </button>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingProduct) && (
            <ProductForm
              product={editingProduct}
              onSave={(p) => {
                if (editingProduct) {
                  setProductList(prev => prev.map(pr => pr.id === p.id ? p : pr));
                } else {
                  setProductList(prev => [...prev, { ...p, id: Date.now().toString() }]);
                }
                setEditingProduct(null);
                setShowAddForm(false);
              }}
              onCancel={() => { setEditingProduct(null); setShowAddForm(false); }}
            />
          )}

          {/* Product List */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Rasm</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Nomi</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Kategoriya</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Narxi</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Holat</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(p => (
                    <tr key={p.id} className="border-t border-gray-100">
                      <td className="px-4 py-2"><img src={p.image} alt="" className="w-10 h-10 rounded object-cover" /></td>
                      <td className="px-4 py-2 font-medium">{p.name}</td>
                      <td className="px-4 py-2 text-gray-500">{p.category}</td>
                      <td className="px-4 py-2">{formatPrice(p.price)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.inStock ? 'Mavjud' : 'Tugagan'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => setEditingProduct(p)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => setProductList(prev => prev.filter(pr => pr.id !== p.id))} className="p-1 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }: { product: Product | null; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>(product || {
    id: '', name: '', price: 0, description: '', category: 'Atirgullar',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop',
    inStock: true
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
      <h4 className="font-bold text-gray-800 mb-4">{product ? 'Tahrirlash' : 'Yangi mahsulot qo\'shish'}</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomi</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Narxi (so'm)</label>
          <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 bg-white">
            {categories.filter(c => c !== 'Barchasi').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rasm URL</label>
          <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500" rows={2} />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.inStock} onChange={e => setForm({ ...form, inStock: e.target.checked })}
              className="rounded border-gray-300" />
            <span className="text-sm">Mavjud</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })}
              className="rounded border-gray-300" />
            <span className="text-sm">Yangi</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.isPopular} onChange={e => setForm({ ...form, isPopular: e.target.checked })}
              className="rounded border-gray-300" />
            <span className="text-sm">Mashhur</span>
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
          Saqlash
        </button>
        <button onClick={onCancel} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
          Bekor qilish
        </button>
      </div>
    </div>
  );
}
