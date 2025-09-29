// PÁGINA DE EDIÇÃO (app/admin/edit-book/[id]/page.tsx)

'use client';
import EditBookForm from '@/components/EditBookForm';

type EditBookPageProps = {
  params: {
    id: string;
  };
};

export default function EditBookPage({ params }: EditBookPageProps) {
  return (
    <div>
      <EditBookForm bookId={params.id} />
    </div>
  );
}