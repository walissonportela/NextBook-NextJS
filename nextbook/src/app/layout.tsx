import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import MainLayout from '@/components/MainLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import { FilterProvider } from '@/contexts/FilterContext'; 
import { CartProvider } from '@/contexts/CartContext'; 

export const metadata: Metadata = {
  title: 'NextBook',
  description: 'Sua livraria online',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <StyledComponentsRegistry>
            <FilterProvider>
              <CartProvider>
                <MainLayout>{children}</MainLayout>
                </CartProvider>
            </FilterProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}