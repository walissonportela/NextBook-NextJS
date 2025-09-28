'use client';

import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useFilter } from '@/contexts/FilterContext';
import api from '@/services/api';
import Image from 'next/image';
import toast from 'react-hot-toast';

// Ícones
const StarIcon = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" color="#f59e0b"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> );
const StarIconEmpty = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> );
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: fullStars }, (_, i) => <StarIcon key={`full-${i}`} />)}
      {Array.from({ length: totalStars - fullStars }, (_, i) => <StarIconEmpty key={`empty-${i}`} />)}
    </div>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
`;
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;
const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1D4ED8;
`;
const AddBookButton = styled(Link)`
  background-color: #10B981; color: white; padding: 0.75rem 1.5rem;
  border-radius: 8px; font-weight: 600; text-decoration: none;
  transition: background-color 0.2s; display: inline-flex;
  align-items: center; gap: 0.5rem;
  &:hover { background-color: #059669; }
`;
const ShopLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  align-items: flex-start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const Sidebar = styled.aside`
  position: sticky; top: 6.5rem;
  @media (max-width: 900px) { position: static; margin-bottom: 2rem; }
`;
const FilterCard = styled.div`
  background-color: #ffffff; border-radius: 12px; padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;
const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
  &:last-child { margin-bottom: 0; }
`;
const FilterTitle = styled.h3`
  font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb; padding-bottom: 0.75rem;
`;
const CheckboxLabel = styled.label`
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 0.5rem; cursor: pointer; color: #374151;
`;
const MainContent = styled.div`
  height: calc(100vh - 180px);
  overflow-y: auto; padding-right: 1rem;
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  &::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
  @media (max-width: 900px) { height: auto; overflow-y: visible; padding-right: 0; }
`;
const BookGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding-bottom: 2rem;
`;
const PaginationContainer = styled.nav`
  display: flex; justify-content: center; align-items: center;
  gap: 0.5rem; padding: 1rem 0;
`;
const PageButton = styled.button<{ $isActive?: boolean }>`
  width: 40px; height: 40px; border-radius: 8px; border: 1px solid #d1d5db;
  cursor: pointer; font-weight: 600;
  background-color: ${({ $isActive }) => $isActive ? '#2563EB' : '#FFFFFF'};
  color: ${({ $isActive }) => $isActive ? '#FFFFFF' : '#374151'};
  &:hover { background-color: ${({ $isActive }) => $isActive ? '#1D4ED8' : '#f9fafb'}; }
  &:disabled { cursor: not-allowed; opacity: 0.5; }
`;
const BookCard = styled.div`
  background-color: #ffffff; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: flex; flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;
const BestsellerTag = styled.div`
  position: absolute; top: 10px; left: -2px; background-color: #ef4444;
  color: white; padding: 4px 12px; font-size: 0.75rem; font-weight: bold;
  border-radius: 0 4px 4px 0; box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
`;
const BookImageWrapper = styled.div`
  width: 100%; aspect-ratio: 2 / 3; position: relative; background-color: #f3f4f6;
`;
const BookInfo = styled.div`
  padding: 1rem; display: flex; flex-direction: column; flex-grow: 1;
`;
const BookTitle = styled.h2`
  font-size: 1.1rem; font-weight: 600; color: #1f2937;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis; min-height: 2.75rem; margin-bottom: 0.5rem;
`;
const Rating = styled.div`
  display: flex; align-items: center; gap: 0.25rem; font-size: 0.9rem;
  color: #4b5563; margin-bottom: 1rem;
`;
const BookPrice = styled.span`
  font-size: 1.5rem; font-weight: 800; color: #15803d; margin-top: auto;
`;
const AddToCartButton = styled.button`
  margin-top: 1rem; padding: 0.75rem; width: 100%; border-radius: 8px;
  background-color: #2563EB; color: white; font-weight: 600; border: none;
  cursor: pointer; transition: background-color 0.2s;
  &:hover { background-color: #1D4ED8; }
`;

type Book = {
  id: string; name: string; price: number;
  imageUrl: string; rating: number;
};

export default function HomePage() {
  const [apiBooks, setApiBooks] = useState<Book[]>([]); 
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { searchQuery, priceFilters, setPriceFilters } = useFilter();

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append('name', searchQuery);
        }
        const response = await api.get(`/products?${params.toString()}`);
        const booksData = (response.data.products || []).map((book: Omit<Book, 'rating'>) => ({
          ...book,
          rating: parseFloat((Math.random() * (4.9 - 4) + 4).toFixed(1)),
        }));
        setApiBooks(booksData); 
      } catch (error) {
        console.error("Falha ao buscar livros:", error);
        toast.error("Não foi possível carregar os livros.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

 
  const filteredBooks = useMemo(() => {

    if (priceFilters.length === 0) {
      return apiBooks;
    }

    return apiBooks.filter(book =>
      priceFilters.some(filter => {
        if (filter === 'under30') return book.price <= 30;
        if (filter === '30to50') return book.price > 30 && book.price <= 50;
        if (filter === 'over50') return book.price > 50;
        return false;
      })
    );
  }, [apiBooks, priceFilters]); 

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceFilters]);


  const handlePriceFilterChange = (filter: string) => {
    setPriceFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };
  
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Nossos Livros</PageTitle>
        {isAuthenticated && user?.role === 'ADMIN' && (
          <AddBookButton href="/admin/add-book">+ Adicionar Novo Livro</AddBookButton>
        )}
      </PageHeader>
      <ShopLayout>
        <Sidebar>
          <FilterCard>
            <FilterGroup>
              <FilterTitle>Preço</FilterTitle>
              <CheckboxLabel>
                <input type="checkbox" checked={priceFilters.includes('under30')} onChange={() => handlePriceFilterChange('under30')} /> Até R$ 30,00
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={priceFilters.includes('30to50')} onChange={() => handlePriceFilterChange('30to50')} /> R$ 30,00 a R$ 50,00
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={priceFilters.includes('50to80')} onChange={() => handlePriceFilterChange('30to50')} /> R$ 50,00 a R$ 80,00
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={priceFilters.includes('80to120')} onChange={() => handlePriceFilterChange('30to50')} /> R$ 80,00 a R$ 120,00
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" checked={priceFilters.includes('over120')} onChange={() => handlePriceFilterChange('over50')} /> Acima de R$ 120,00
              </CheckboxLabel>
            </FilterGroup>
          </FilterCard>
        </Sidebar>
        <MainContent>
          {loading ? (<p>Carregando livros...</p>) : 
          filteredBooks.length > 0 ? (
            <>
              <BookGrid>
                {currentBooks.map((book, index) => (
                  <Link href={`/product/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
                    <BookCard>
                      {(index + indexOfFirstBook) < 3 && <BestsellerTag>Mais Vendido</BestsellerTag>}
                      <BookImageWrapper>
                        <Image src={book.imageUrl} alt={`Capa do livro ${book.name}`} layout="fill" objectFit="cover" />
                      </BookImageWrapper>
                      <BookInfo>
                        <BookTitle>{book.name}</BookTitle>
                        <Rating>
                          <StarRating rating={book.rating} />
                          <span>({book.rating.toFixed(1)})</span>
                        </Rating>
                        <BookPrice>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</BookPrice>
                        <AddToCartButton>Adicionar ao Carrinho</AddToCartButton>
                      </BookInfo>
                    </BookCard>
                  </Link>
                ))}
              </BookGrid>
              {totalPages > 1 && (
                <PaginationContainer>
                  <PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</PageButton>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <PageButton key={number} onClick={() => paginate(number)} $isActive={number === currentPage}>{number}</PageButton>
                  ))}
                  <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</PageButton>
                </PaginationContainer>
              )}
            </>
          ) : (<p>Nenhum livro encontrado com os filtros selecionados.</p>)}
        </MainContent>
      </ShopLayout>
    </PageContainer>
  );
}