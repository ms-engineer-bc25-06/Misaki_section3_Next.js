import TransactionForm from '@/components/TransactionForm';

export default function AddPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">新規取引の登録</h1>
      <TransactionForm />
    </main>
  );
}
