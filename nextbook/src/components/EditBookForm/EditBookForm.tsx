// EDIÇÃO DE LIVROS (app/components/EditBookForm/EditBookForm.tsx)
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { PageContainer, BookFormFields, BookPreview } from './EditBookFormComponents';

export default function EditBookForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams(); 
  const bookId = params.id as string; 

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const { data } = await api.get(`/products/${bookId}`);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price.toString());
          setPreviewImage(data.imageUrl);
        } catch (error) {
          console.error("Falha ao buscar dados do livro:", error); 
          toast.error('Livro não encontrado!');
          router.push('/'); 
        }
      };
      fetchBook();
    }
  }, [bookId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) { 
      formData.append('image', image);
    }

    const toastId = toast.loading('Atualizando livro...');

    try {
      await api.put(`/products/${bookId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success('Livro atualizado com sucesso!');
      router.push(`/product/${bookId}`); 

    } catch (error) {
      let errorMessage = "Ocorreu um erro ao atualizar.";
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(`Erro: ${errorMessage}`);
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <BookFormFields
        name={name}
        description={description}
        price={price}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onNameChange={(e) => setName(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onPriceChange={(e) => setPrice(e.target.value)}
        onImageChange={handleImageChange}
      />
      <BookPreview
        name={name}
        description={description}
        price={price}
        previewImage={previewImage}
      />
    </PageContainer>
  );
}