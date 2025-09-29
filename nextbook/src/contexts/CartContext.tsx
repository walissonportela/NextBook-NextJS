// CONTEXTO DO CARRINHO

'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: Book) => void;
  removeFromCart: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  cartCount: number;
  cartTotal: number;
}

type Book = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); 

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('nextbook-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage", error);
    }
    setIsInitialized(true); 
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('nextbook-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (item: Book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} foi adicionado ao carrinho!`);
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(prevItems => {
      const itemToDecrease = prevItems.find(item => item.id === itemId);
      
      if (itemToDecrease && itemToDecrease.quantity === 1) {
        return prevItems.filter(item => item.id !== itemId);
      }
      
      return prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.error('Item removido do carrinho.');
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ isOpen, toggleCart, cartItems, addToCart, removeFromCart, decreaseQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};