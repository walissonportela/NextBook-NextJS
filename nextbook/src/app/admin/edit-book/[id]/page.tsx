import BookForm from "@/components/BookForm";

export default function EditBookPage({ params }: { params: { id: string } }) {
  return <BookForm bookId={params.id} />;
}