// PÁGINA DE EDIÇÃO (app/admin/edit-book/[id]/page.tsx)

import BookForm from "@/components/EditBookForm";

export default function EditBookPage({ params }: { params: { id: string } }) {
  return <BookForm bookId={params.id} />; 
}