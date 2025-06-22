'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Transaction } from '@/types/Transaction';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [loading, setLoading] = useState(false);

  // データ取得
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/transactions');
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // フィルタリング処理
  useEffect(() => {
    const filtered = transactions.filter(transaction => {
      if (filter === 'all') return true;
      return transaction.type === filter;
    });
    setFilteredTransactions(filtered);
  }, [transactions, filter]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">入出金一覧</h2>

      <select
        className="border p-1 rounded mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
      >
        <option value="all">すべて</option>
        <option value="income">収入</option>
        <option value="expense">支出</option>
      </select>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <ul className="space-y-2">
          {filteredTransactions.map(t => (
            <li key={t.id} className="p-2 border rounded hover:bg-gray-100">
              <Link href={`/detail/${t.id}`}>
                <span className="text-blue-600 underline">
                  {t.date} - {t.category} - {t.amount.toLocaleString()}円（{t.type === 'income' ? '収入' : '支出'}）
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

