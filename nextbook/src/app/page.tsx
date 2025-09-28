'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap; // Para telas menores
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
`;

const AddBookButton = styled(Link)`
  background-color: #10B981; 
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #059669;
  }
`;


const ShopLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Sidebar = styled.aside`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
  h3 { font-weight: 600; margin-bottom: 1rem; }
  input {
    width: 100%; padding: 0.5rem;
    border: 1px solid #ced4da; border-radius: 4px;
  }
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const BookCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  h2 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; color: #212529; }
  p { flex-grow: 1; color: #6c757d; margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.5; }
  span { font-size: 1.1rem; font-weight: bold; color: #007bff; align-self: flex-end; }
`;

type Book = { id: string; name: string; description: string; price: number; };

export default function HomePage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await api.get('/products');
        const booksData = Array.isArray(response.data) ? response.data : response.data.products || [];
        setAllBooks(booksData);
        setFilteredBooks(booksData);
      } catch (error) {
        console.error("Falha ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    const results = allBooks.filter(book =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, allBooks]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Nossos Livros</PageTitle>
        {isAuthenticated && (
          <AddBookButton href="/admin/add-book">
            + Adicionar Novo Livro
          </AddBookButton>
        )}
      </PageHeader>

      <ShopLayout>
        <Sidebar>
          <FilterGroup>
            <h3>Pesquisar por Título</h3>
            <input
              type="text"
              placeholder="Ex: O Senhor dos Anéis"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>
          <FilterGroup>
            <h3>Filtrar por Preço</h3>
            <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>Em breve...</p>
          </FilterGroup>
        </Sidebar>

        <main>
          {loading ? (
            <p>Carregando livros...</p>
          ) : (
            <BookGrid>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard key={book.id}>
                    <h2>{book.name}</h2>
                    <p>{book.description}</p>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</span>
                  </BookCard>
                ))
              ) : (
                <p>Nenhum livro encontrado com esse critério.</p>
              )}
            </BookGrid>
          )}
        </main>
      </ShopLayout>
    </PageContainer>
  );
}