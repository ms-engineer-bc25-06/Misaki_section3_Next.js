'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { useNavigate } from 'react-router-dom';
//import type { Transaction } from '../../types/Transaction';

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    type: 'income',
    category: '',
    amount: 0,
    memo: ''
  });

   const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('登録に失敗しました');

      alert('登録が完了しました！');
      router.push('/'); // 一覧に戻すなど
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">家計の登録</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
        <input
          name="category"
          type="text"
          placeholder="カテゴリ"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="金額"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="memo"
          type="text"
          placeholder="メモ"
          value={formData.memo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          登録する
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;