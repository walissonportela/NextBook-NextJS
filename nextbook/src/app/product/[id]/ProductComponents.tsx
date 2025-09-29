// products/[id]/ProductComponents.tsx

import styled from 'styled-components';
import Link from 'next/link';

// ÍCONES 
export const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" color="#f59e0b">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const StarIconEmpty = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="#f59e0b">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

export const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

// Componente StarRating 
export const StarRating = ({ rating }: { rating: number }) => {
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
export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2.5rem;
  position: relative;
`;

export const AdminActionsContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 2.5rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
`;

export const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  color: white;
  transition: opacity 0.2s;
  background-color: #f59e0b; /* Laranja */

  &:hover {
    opacity: 0.85;
  }
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  color: white;
  transition: opacity 0.2s;
  background-color: #ef4444; /* Vermelho */

  &:hover {
    opacity: 0.85;
  }
`;

export const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  padding-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 5rem;
  }
`;

export const ImageColumn = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const ProductPrice = styled.p`
  font-size: 2.75rem;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 2rem;
`;

export const AddToCartButton = styled.button`
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  background-color: #2563EB;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #1D4ED8;
  }
`;

export const ProductDescription = styled.div`
  margin-top: 2rem;
  color: #4b5563;
  line-height: 1.6;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.5rem;
`;