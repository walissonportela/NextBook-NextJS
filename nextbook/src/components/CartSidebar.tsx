// CARRINHO DE COMPRAS

'use client';

import { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

// Styled Components
const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: white;
  z-index: 100;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ItemImage = styled(Image)`
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemTitle = styled.p`
  font-weight: 600;
`;

const ItemPrice = styled.p`
  color: #6b7280;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  border: 1px solid #ccc;
  background-color: #f9fafb;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
`;

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #16a34a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
`;

const EmptyCartMessage = styled.div`
    text-align: center;
    padding-top: 4rem;
    color: #6b7280;
`;


export default function CartSidebar() {
  const { isOpen, toggleCart, cartItems, addToCart, decreaseQuantity, removeFromCart, cartTotal } = useCart();
  
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
        <Header>
          <Title>
            <FiShoppingCart size={22 } style={{ marginRight: '10px'}} />
            Meu Carrinho
          </Title>
          <CloseButton onClick={toggleCart}>&times;</CloseButton>
        </Header>
        <CartItemsList>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.imageUrl} alt={item.name} width={80} height={120} style={{objectFit:"cover"}} />
                <ItemDetails>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemPrice>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</ItemPrice>
                  <QuantityControl>
                    <QuantityButton onClick={() => decreaseQuantity(item.id)}>-</QuantityButton>
                    <span>{item.quantity}</span>
                    <QuantityButton onClick={() => addToCart(item)}>+</QuantityButton>
                    <button onClick={() => removeFromCart(item.id)} style={{marginLeft: 'auto', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>Remover</button>
                  </QuantityControl>
                </ItemDetails>
              </CartItem>
            ))
          ) : (
            <EmptyCartMessage>Seu carrinho está vazio.</EmptyCartMessage>
          )}
        </CartItemsList>
        {cartItems.length > 0 && (
          <Footer>
            <TotalContainer>
              <span>Total</span>
              <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
            </TotalContainer>
            <CheckoutButton href="#">Finalizar Compra</CheckoutButton>
          </Footer>
        )}
      </SidebarContainer>
    </>
  );
}