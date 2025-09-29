// PÁGINA DO PRODUTO (products/[id]/page.tsx)

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';
import { isAxiosError } from 'axios';

// Import dos componentes
import {
  PageWrapper,
  AdminActionsContainer,
  EditButton,
  DeleteButton,
  ProductLayout,
  ImageColumn,
  DetailsColumn,
  ProductTitle,
  RatingContainer,
  ProductPrice,
  AddToCartButton,
  ProductDescription,
  LoadingSpinner,
  StarRating,
  EditIcon,
  TrashIcon,
} from './ProductComponents';

type Book = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductPage() {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const { data } = await api.get(`/products/${bookId}`);
          setBook(data);
        } catch (error) {
          console.error("Falha ao buscar o livro:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [bookId]); 

  const handleDelete = async () => {
    toast(
      (t) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontWeight: 600 }}>
            Tem certeza que deseja deletar este livro?
          </p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Esta ação é irreversível.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const toastId = toast.loading('Deletando livro...');
                try {
                  await api.delete(`/products/${bookId}`);
                  toast.success('Livro deletado com sucesso!');
                  router.push('/');
                } catch (error) {
                  let errorMessage = 'Falha ao deletar o livro.';
                  if (isAxiosError(error) && error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                  }
                  toast.error(errorMessage);
                } finally {
                  toast.dismiss(toastId);
                }
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Deletar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          border: '1px solid #ff4b4b',
        },
      }
    );
  };

  if (loading) {
    return <LoadingSpinner>Carregando...</LoadingSpinner>;
  }

  if (!book) {
    return <LoadingSpinner>Livro não encontrado.</LoadingSpinner>;
  }

  return (
    <PageWrapper>
       {isAuthenticated && user?.role === 'ADMIN' && (
        <AdminActionsContainer>
          <EditButton href={`/admin/edit-book/${book.id}`}>
            <EditIcon /> Editar
          </EditButton>
          <DeleteButton onClick={handleDelete}>
            <TrashIcon /> Deletar
          </DeleteButton>
        </AdminActionsContainer>
      )}

      <ProductLayout>
        <ImageColumn>
          <Image
            src={book.imageUrl}
            alt={`Capa do livro ${book.name}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </ImageColumn>
        <DetailsColumn>
          <ProductTitle>{book.name}</ProductTitle>
          <RatingContainer>
            <StarRating rating={4} />
            <span>(4.5)</span>
          </RatingContainer>
          <ProductPrice>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}
          </ProductPrice>

          <AddToCartButton onClick={() => addToCart(book)}>
              Adicionar ao Carrinho +
          </AddToCartButton>
          <ProductDescription>
            <h3>Descrição</h3>
            <p>{book.description}</p>
          </ProductDescription>
        </DetailsColumn>
      </ProductLayout>
    </PageWrapper>
  );
}