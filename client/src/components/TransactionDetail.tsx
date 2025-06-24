'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Transaction = {
  id: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  memo?: string;
};

const TransactionDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    date: '',
    type: 'income',
    category: '',
    amount: 0,
    memo: '',
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/transactions/${id}`);
        if (!res.ok) throw new Error('取得失敗');
        const data = await res.json();
        setTransaction(data);
        setFormData({
          date: data.date,
          type: data.type,
          category: data.category,
          amount: data.amount,
          memo: data.memo || '',
        });
      } catch (e) {
        console.error(e);
        setTransaction(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTransaction();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleDelete = async () => {
    if (!transaction) return;
    if (!window.confirm('削除しますか？')) return;

    try {
      await fetch(`http://localhost:4000/api/transactions/${transaction.id}`, {
        method: 'DELETE',
      });
      alert('削除しました');
      router.push('/list');
    } catch {
      alert('削除に失敗しました');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    try {
      const res = await fetch(`http://localhost:4000/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setTransaction(updated);
      setIsEditing(false);
      alert('更新しました');
    } catch {
      alert('更新に失敗しました');
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (!transaction) return <p>データが見つかりません</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">取引詳細</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="date" value={formData.date} onChange={handleChange} type="date" className="w-full p-2 border rounded" />
          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="income">収入</option>
            <option value="expense">支出</option>
          </select>
          <input name="category" value={formData.category} onChange={handleChange} placeholder="カテゴリ" className="w-full p-2 border rounded" />
          <input name="amount" value={formData.amount} onChange={handleChange} type="number" placeholder="金額" className="w-full p-2 border rounded" />
          <input name="memo" value={formData.memo} onChange={handleChange} placeholder="メモ" className="w-full p-2 border rounded" />
          <div className="flex space-x-2">
            <button type="submit" className="flex-1 bg-blue-500 text-white py-2 rounded">保存</button>
            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-300 py-2 rounded">キャンセル</button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>日付:</strong> {transaction.date}</p>
          <p><strong>タイプ:</strong> {transaction.type === 'income' ? '収入' : '支出'}</p>
          <p><strong>カテゴリ:</strong> {transaction.category}</p>
          <p><strong>金額:</strong> {transaction.amount.toLocaleString()} 円</p>
          {transaction.memo && <p><strong>メモ:</strong> {transaction.memo}</p>}
          <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-yellow-400 rounded">編集</button>
          <button onClick={handleDelete} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">削除</button>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
