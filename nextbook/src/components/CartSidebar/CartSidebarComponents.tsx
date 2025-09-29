'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// STYLED COMPONENTS
export const Overlay = styled.div<{ $isOpen: boolean }>`
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

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
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

export const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CartItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ItemImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.875rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column; 
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
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  gap: 0.5rem;           
  width: 60%;
  max-width: 320px;     
  padding: 1rem;
  background-color: #16a34a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover { background-color: #15803d; }
`;

const EmptyCartMessage = styled.div`
    text-align: center;
    padding-top: 4rem;
    color: #6b7280;
`;


// COMPONENTES REUTILIZÁVEIS 
export const CartHeader = ({ onClose }: { onClose: () => void }) => (
  <Header>
    <Title>
      <FiShoppingCart size={22} />
      Meu Carrinho
    </Title>
    <CloseButton onClick={onClose}>&times;</CloseButton>
  </Header>
);

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => (
  <CartItemContainer>
    <ItemImage src={item.imageUrl} alt={item.name} width={80} height={120} />
    <ItemDetails>
      <ItemTitle>{item.name}</ItemTitle>
      <ItemPrice>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</ItemPrice>
      <QuantityControl>
        <QuantityButton onClick={onDecrease}>-</QuantityButton>
        <span>{item.quantity}</span>
        <QuantityButton onClick={onIncrease}>+</QuantityButton>
        <RemoveButton onClick={onRemove}>Remover</RemoveButton>
      </QuantityControl>
    </ItemDetails>
  </CartItemContainer>
);

export const CartFooter = ({ total }: { total: number }) => (
  <Footer>
    <TotalContainer>
      <span>Total</span>
      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
    </TotalContainer>
    <CheckoutButton href="/">
      Finalizar Compra
      <FiArrowRight size={20}/>
    </CheckoutButton>
  </Footer>
);

export const EmptyCart = () => (
  <EmptyCartMessage>
    Seu carrinho está vazio.
  </EmptyCartMessage>
);