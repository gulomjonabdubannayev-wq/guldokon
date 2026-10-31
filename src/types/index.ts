export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  region: string;
  district: string;
  address: string;
  comment: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: string;
  totalPrice: number;
  deliveryPrice: number;
  status: string;
  createdAt: string;
}

export interface Region {
  name: string;
  districts: string[];
}
