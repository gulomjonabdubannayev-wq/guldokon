import { Product } from '../types';

export const categories = [
  'Barchasi',
  'Atirgullar',
  'Lola gullari',
  'Pionlar',
  'Moychechaklar',
  'Orxideyalar',
  'Liliyalar',
  'Xrizantemalar',
  'Gortenziyalar',
  'Aralash guldastalar',
  'Premium guldastalar',
  'To\'y uchun gullar',
  'Tug\'ilgan kun uchun',
  'Savatdagi gullar',
  'Sun\'iy gullar',
  'Uy gullari',
];

export const products: Product[] = [
  // Atirgullar
  { id: '1', name: '1 dona qizil atirgul', price: 15000, description: 'Yangi uzilgan, sifatli qizil atirgul. Romantik sovg\'a uchun ideal.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '2', name: '11 dona qizil atirgul', price: 180000, description: '11 ta chiroyli qizil atirgul guldastasi. Sevgi va muhabbat ramzi.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop', inStock: true, isPopular: true, isNew: true },
  { id: '3', name: '25 dona qizil atirgul', price: 400000, description: '25 ta nafis qizil atirgul. Katta va ta\'sirli sovg\'a.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '4', name: '51 dona qizil atirgul', price: 850000, description: '51 ta hashamatli qizil atirgul. Eng katta va chiroyli guldasta.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1518701005037-d53b1b15a114?w=400&h=400&fit=crop', inStock: true },
  { id: '5', name: '101 dona qizil atirgul', price: 1600000, description: '101 ta premium qizil atirgul. Hashamatli va unutilmas sovg\'a.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '6', name: 'Oq atirgullar guldastasi', price: 250000, description: '15 dona oq atirgul. Soflik va poklik ramzi.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1558355551-7a2b3b5576e4?w=400&h=400&fit=crop', inStock: true },
  { id: '7', name: 'Pushti atirgullar', price: 200000, description: '15 dona nozik pushti atirgullar. Mehr-muhabbat ifodasi.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=400&fit=crop', inStock: true, isNew: true },
  { id: '8', name: 'Sariq atirgullar', price: 190000, oldPrice: 230000, discount: 17, description: '11 dona quvnoq sariq atirgullar. Do\'stlik va quvonch ramzi.', category: 'Atirgullar', image: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=400&h=400&fit=crop', inStock: true },

  // Lola gullari
  { id: '9', name: 'Lola guldastasi (15 dona)', price: 220000, description: '15 dona rang-barang lola gullari. Bahor kayfiyati.', category: 'Lola gullari', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '10', name: 'Qizil lola guldastasi', price: 180000, description: '11 dona qizil lola. Bahorning eng chiroyli sovg\'asi.', category: 'Lola gullari', image: 'https://images.unsplash.com/photo-1524573092416-135f227f6841?w=400&h=400&fit=crop', inStock: true },
  { id: '11', name: 'Aralash lola guldastasi', price: 250000, oldPrice: 300000, discount: 17, description: '21 dona rang-barang lola. Har xil ranglar uyg\'unligi.', category: 'Lola gullari', image: 'https://images.unsplash.com/photo-1591997818992-87f45d11d8c5?w=400&h=400&fit=crop', inStock: true, isNew: true },

  // Pionlar
  { id: '12', name: 'Pion guldastasi', price: 450000, description: '7 dona hashamatli pushti pion. Nozik va nafis guldasta.', category: 'Pionlar', image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '13', name: 'Oq pionlar', price: 480000, description: '9 dona oq pionlar. Elegent va zamonaviy guldasta.', category: 'Pionlar', image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400&h=400&fit=crop', inStock: true },
  { id: '14', name: 'Pion va atirgul aralashmasi', price: 520000, oldPrice: 600000, discount: 13, description: 'Pion va atirgullar aralashmasi. Noyob va chiroyli.', category: 'Pionlar', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop', inStock: true, isNew: true },

  // Moychechaklar
  { id: '15', name: 'Moychechak guldastasi', price: 120000, description: '21 dona sariq moychechak. Quvnoq va yorqin sovg\'a.', category: 'Moychechaklar', image: 'https://images.unsplash.com/photo-1551731956-db02a8165553?w=400&h=400&fit=crop', inStock: true },
  { id: '16', name: 'Katta moychechak guldastasi', price: 200000, oldPrice: 250000, discount: 20, description: '41 dona katta moychechaklar. Yorqin va ta\'sirli.', category: 'Moychechaklar', image: 'https://images.unsplash.com/photo-1537791489321-0ea2051a6b6e?w=400&h=400&fit=crop', inStock: true },

  // Orxideyalar
  { id: '17', name: 'Orxideya (1 tana)', price: 300000, description: 'Nafis orxideya o\'simligi. Uchun uzoq vaqt gullaydi.', category: 'Orxideyalar', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '18', name: 'Oq orxideya', price: 350000, description: 'Oq rangdagi premium orxideya. Zamonaviy va elegant.', category: 'Orxideyalar', image: 'https://images.unsplash.com/photo-1566837945700-3005755318f6?w=400&h=400&fit=crop', inStock: true },
  { id: '19', name: 'Pushti orxideya', price: 320000, description: 'Nozik pushti orxideya. Xonani chiroyli bezaydi.', category: 'Orxideyalar', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&h=400&fit=crop', inStock: true, isNew: true },

  // Liliyalar
  { id: '20', name: 'Liliya guldastasi', price: 280000, description: '5 dona oq liliya. Nafis va xushbo\'y guldasta.', category: 'Liliyalar', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=400&fit=crop', inStock: true },
  { id: '21', name: 'Pushti liliyalar', price: 260000, oldPrice: 310000, discount: 16, description: '7 dona pushti liliyalar. Romantik va nafis.', category: 'Liliyalar', image: 'https://images.unsplash.com/photo-1501004318855-6e61e2144f28?w=400&h=400&fit=crop', inStock: true },

  // Xrizantemalar
  { id: '22', name: 'Xrizantema guldastasi', price: 150000, description: '9 dona xrizantema. Uzoq vaqt saqlanadi.', category: 'Xrizantemalar', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop', inStock: true },
  { id: '23', name: 'Rang-barang xrizantemalar', price: 180000, description: '11 dona aralash xrizantemalar. Quvnoq va yorqin.', category: 'Xrizantemalar', image: 'https://images.unsplash.com/photo-1535489352369-4321cde230c4?w=400&h=400&fit=crop', inStock: true, isNew: true },

  // Gortenziyalar
  { id: '24', name: 'Gortenziya guldastasi', price: 380000, description: 'Katta gortenziya guldastasi. Hashamatli va nozik.', category: 'Gortenziyalar', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop', inStock: true },
  { id: '25', name: 'Ko\'k gortenziya', price: 400000, oldPrice: 480000, discount: 17, description: 'Noyob ko\'k gortenziya. O\'zgacha va chiroyli.', category: 'Gortenziyalar', image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?w=400&h=400&fit=crop', inStock: true },

  // Aralash guldastalar
  { id: '26', name: 'Bahor aralashmasi', price: 300000, description: 'Atirgul, lola va moychechak aralashmasi. Bahor kayfiyati.', category: 'Aralash guldastalar', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '27', name: 'Romantik aralashma', price: 350000, description: 'Atirgul va pion aralashmasi. Sevgi uchun ideal.', category: 'Aralash guldastalar', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop', inStock: true },
  { id: '28', name: 'Yozgi aralashma', price: 270000, oldPrice: 330000, discount: 18, description: 'Liliya, xrizantema va yashil barglar. Yozgi nafislik.', category: 'Aralash guldastalar', image: 'https://images.unsplash.com/photo-1501004318855-6e61e2144f28?w=400&h=400&fit=crop', inStock: true },

  // Premium guldastalar
  { id: '29', name: 'Premium Hashamat', price: 1200000, description: '101 dona atirgul va pion aralashmasi. Eng yuqori sifat.', category: 'Premium guldastalar', image: 'https://images.unsplash.com/photo-1518701005037-d53b1b15a114?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '30', name: 'Royal Collection', price: 2000000, description: 'Ekskluziv guldasta. Premium atirgullar va gortenziyalar.', category: 'Premium guldastalar', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop', inStock: true },
  { id: '31', name: 'Elegance', price: 800000, description: '51 dona premium atirgul va orxideya aralashmasi.', category: 'Premium guldastalar', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop', inStock: true, isNew: true },

  // To'y uchun
  { id: '32', name: 'To\'y buketi "Oq Armoniya"', price: 500000, description: 'Oq atirgul va pionlardan iborat to\'y buketi.', category: 'To\'y uchun gullar', image: 'https://images.unsplash.com/photo-1558355551-7a2b3b15a114?w=400&h=400&fit=crop', inStock: true },
  { id: '33', name: 'To\'y guldastasi "Pushti Orzu"', price: 450000, description: 'Pushti atirgul va pionlar. Nozik va romantik.', category: 'To\'y uchun gullar', image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=400&fit=crop', inStock: true },
  { id: '34', name: 'To\'y bezagi paketi', price: 3000000, description: 'To\'y zalini bezash uchun to\'liq gul paketi.', category: 'To\'y uchun gullar', image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?w=400&h=400&fit=crop', inStock: true, isPopular: true },

  // Tug'ilgan kun
  { id: '35', name: 'Tug\'ilgan kun guldastasi', price: 250000, description: 'Rang-barang gullar aralashmasi. Quvnoq va yorqin.', category: 'Tug\'ilgan kun uchun', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop', inStock: true },
  { id: '36', name: 'Yubiley guldastasi', price: 400000, oldPrice: 480000, discount: 17, description: 'Hashamatli guldasta. Katta yubiley uchun munosib sovg\'a.', category: 'Tug\'ilgan kun uchun', image: 'https://images.unsplash.com/photo-1518701005037-d53b1b15a114?w=400&h=400&fit=crop', inStock: true },

  // Savatdagi gullar
  { id: '37', name: 'Gul savatchasi "Bahor"', price: 350000, description: 'Chiroyli savatga joylangan rang-barang gullar.', category: 'Savatdagi gullar', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop', inStock: true },
  { id: '38', name: 'Premium gul savati', price: 550000, description: 'Katta savatga joylangan premium gullar aralashmasi.', category: 'Savatdagi gullar', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop', inStock: true, isPopular: true },

  // Sun'iy gullar
  { id: '39', name: 'Sun\'iy atirgul (1 dona)', price: 45000, description: 'Sifatli sun\'iy atirgul. Uzoq vaqt chiroyli turadi.', category: 'Sun\'iy gullar', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop', inStock: true },
  { id: '40', name: 'Sun\'iy gul aralashmasi', price: 120000, description: 'Turli sun\'iy gullar aralashmasi. Uy bezagi uchun.', category: 'Sun\'iy gullar', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop', inStock: true },

  // Uy gullari
  { id: '41', name: 'Spatifillum', price: 180000, description: 'Havo tozalovchi uy o\'simligi. Soyada yaxshi o\'sadi.', category: 'Uy gullari', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop', inStock: true },
  { id: '42', name: 'Fikus', price: 220000, description: 'Katta fikus o\'simligi. Xonani yashillikka bo\'laydi.', category: 'Uy gullari', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop', inStock: true, isPopular: true },
  { id: '43', name: 'Kaktus aralashmasi', price: 85000, description: '3 dona kichik kaktus. Parvarishi oson.', category: 'Uy gullari', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop', inStock: true, isNew: true },
  { id: '44', name: 'Monstera', price: 280000, description: 'Tropik monstera o\'simligi. Zamonaviy interyer uchun.', category: 'Uy gullari', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop', inStock: true },
];
