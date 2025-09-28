import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import MainLayout from '@/components/MainLayout';
import { AuthProvider } from '@/contexts/AuthContext';

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
            <MainLayout>{children}</MainLayout>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}