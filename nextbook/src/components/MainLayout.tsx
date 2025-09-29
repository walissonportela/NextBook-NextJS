// LAYOUT PRINCIPAL

'use client';

import styled from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast'; 
import CartSidebar from './CartSidebar'; 

import { usePathname } from 'next/navigation';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authRoutes = ['/register', '/login'];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return (
      <>
        <GlobalStyle />
        <Toaster position="top-right" /> 
        {children}
      </>
    );
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <Toaster position="top-right" />
      <Header />
      <CartSidebar />
      <main>{children}</main>
      <Footer />
    </AppContainer>
  );
}