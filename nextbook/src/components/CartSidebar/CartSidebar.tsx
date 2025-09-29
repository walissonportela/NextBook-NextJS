// CARRINHO DE COMPRAS (app/components/CartSidebar/CartSidebar.tsx)

'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Overlay,
  SidebarContainer,
  CartHeader,
  CartItemsList,
  CartItem,
  CartFooter,
  EmptyCart
} from './CartSidebarComponents';

export default function CartSidebar() {
  const { 
    isOpen, 
    toggleCart, 
    cartItems, 
    addToCart, 
    decreaseQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={toggleCart} />
      <SidebarContainer $isOpen={isOpen}>
        <CartHeader onClose={toggleCart} />
        
        <CartItemsList>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onIncrease={() => addToCart(item)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))
          ) : (
            <EmptyCart />
          )}
        </CartItemsList>

        {cartItems.length > 0 && (
          <CartFooter total={cartTotal} />
        )}
      </SidebarContainer>
    </>
  );
}