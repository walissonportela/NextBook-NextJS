'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FiBook, FiArrowRight } from 'react-icons/fi';

// STYLED COMPONENTS 
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  padding: 4rem 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const FormContainer = styled.form`
  flex: 1;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #16a34a;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  &:hover {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const PreviewContainer = styled.div`
  flex: 1;
  max-width: 400px;
  position: sticky;
  top: 4rem;
`;

const PreviewCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
  font-style: italic;
`;

const PreviewImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const PreviewContent = styled.div`
  padding: 1.5rem;
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
  min-height: 2.25rem;
`;

const PreviewDescription = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
  min-height: 3rem; 
`;

const PreviewPrice = styled.p`
  font-size: 2.25rem;
  font-weight: 800;
  color: #16a34a;
  text-align: right;
`;


// COMPONENTES DE UI 
interface BookFormFieldsProps {
  name: string;
  description: string;
  price: string;
  isLoading: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BookFormFields = (props: BookFormFieldsProps) => (
  <FormContainer onSubmit={props.onSubmit}>
    <FormTitle>
      <FiBook size={30} style={{ marginRight: '10px' }} />
      Editar Livro
    </FormTitle>
    <Input type="text" value={props.name} onChange={props.onNameChange} placeholder="Nome do Livro" required />
    <TextArea value={props.description} onChange={props.onDescriptionChange} placeholder="Descrição" required />
    <Input type="number" step="0.01" value={props.price} onChange={props.onPriceChange} placeholder="Preço (ex: 49.90)" required />
    <Input type="file" onChange={props.onImageChange} accept="image/*" />
    <Button type="submit" disabled={props.isLoading}>
      {props.isLoading ? 'Salvando...' : 'Salvar Alterações'}
      <FiArrowRight size={20} style={{ marginLeft: '8px' }} />
    </Button>
  </FormContainer>
);

interface BookPreviewProps {
  name: string;
  description: string;
  price: string;
  previewImage: string | null;
}

const formatPrice = (value: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue);
};

export const BookPreview = ({ name, description, price, previewImage }: BookPreviewProps) => (
  <PreviewContainer>
    <PreviewCard>
      {previewImage ? (
        <PreviewImage src={previewImage} alt="Preview do livro" width={400} height={250} />
      ) : (
        <ImagePlaceholder><span>A imagem da capa aparecerá aqui</span></ImagePlaceholder>
      )}
      <PreviewContent>
        <PreviewTitle>{name || "Nome do Livro"}</PreviewTitle>
        <PreviewDescription>{description || "A descrição do livro aparecerá aqui..."}</PreviewDescription>
        <PreviewPrice>{formatPrice(price)}</PreviewPrice>
      </PreviewContent>
    </PreviewCard>
  </PreviewContainer>
);