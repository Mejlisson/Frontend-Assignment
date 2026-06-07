import bh1 from '../assets/products/bh1.jpg';
import bh2 from '../assets/products/bh2.jpg';
import bh3 from '../assets/products/bh3.jpg';
import trosa4 from '../assets/products/trosa4.jpg';
import trosa5 from '../assets/products/trosa5.jpg';
import trosa6 from '../assets/products/trosa6.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const crossSellProducts: Product[] = [
  {
    id: 2,
    name: 'Smooth Lacy t-shirt bh',
    price: 500,
    image: bh1,
    size: '85B',
    color: 'Vit/Blommig',
    inStock: true
  },
  {
    id: 3,
    name: 'Keep Fresh bh',
    price: 649,
    image: bh2,
    size: '80C',
    color: 'Beige',
    inStock: true
  },
  {
    id: 4,
    name: 'Lovely Lace bh',
    price: 499,
    image: bh3,
    size: '90D',
    color: 'Svart',
    inStock: true
  },
  {
    id: 5,
    name: 'Lovely Lace trosgördel',
    price: 349,
    image: trosa5,
    size: '38/40',
    color: 'Svart',
    inStock: true
  },
  {
    id: 6,
    name: 'Organic Cotton maxitrosa',
    price: 149,
    image: trosa6,
    size: '42/44',
    color: 'Grå',
    inStock: true
  }
];

// The product in the cart when the user first visits the cart page.
export const initialCartItems: CartItem[] = [
  {
    product: {
      id: 1,
      name: 'Cool Sensation trosa med långa ben - Extra täckning',
      price: 349,
      image: trosa4,
      size: '34/36',
      color: 'Beige',
      inStock: true
    },
    quantity: 1
  }
];