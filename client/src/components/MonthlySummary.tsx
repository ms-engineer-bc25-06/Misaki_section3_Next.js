'use client';

import useSWR from 'swr';
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types/Transaction';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MonthlySummary: React.FC = () => {
  const { data: transactions, error } = useSWR<Transaction[]>('http://localhost:4000/api/transactions', fetcher);

if (error) return <div>エラーが発生しました。</div>;
if (!transactions) return <div>読み込み中...</div>;

 // 必要な状態のみ
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


const filteredTransactions = useMemo(() => {
  if (selectedYear === 'all') return transactions;
  return transactions.filter(t => t.date.startsWith(selectedYear));
}, [selectedYear, transactions]);


  // 集計処理（メモ化）
  const summaryData = useMemo(() => {
    const summaryMap: Record<string, { income: number; expense: number }> = {};

    filteredTransactions.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!summaryMap[month]) summaryMap[month] = { income: 0, expense: 0 };
      if (t.type === 'income') summaryMap[month].income += t.amount;
      else summaryMap[month].expense += t.amount;
    });

    const months = Object.keys(summaryMap).sort();
    if (sortOrder === 'desc') months.reverse();

    return { summaryMap, months };
  }, [filteredTransactions, sortOrder]);

  // 利用可能な年度を取得
  const availableYears = useMemo(() => {
    const years = new Set(transactions.map(t => t.date.slice(0, 4)));
    return Array.from(years).sort();
  }, []);

  return (
    <div>
      <h2>月ごとの集計</h2>
      
      {/* フィルター・ソート機能 */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          年度:
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          >
            <option value="all">すべて</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
        </label>
        
        <label>
          並び順:
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            style={{ marginLeft: '10px' }}
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </label>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>入金合計</th>
            <th>出金合計</th>
            <th>差額</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.months.map(month => {
            const { income, expense } = summaryData.summaryMap[month];
            const diff = income - expense;
            return (
              <tr key={month}>
                <td>{month}</td>
                <td style={{ color: 'green' }}>{income.toLocaleString()} 円</td>
                <td style={{ color: 'red' }}>{expense.toLocaleString()} 円</td>
                <td style={{ color: diff >= 0 ? 'green' : 'red' }}>{diff.toLocaleString()} 円</td>
              </tr>
            );
          })}
        </tbody>
      </table>    
    </div>
  );
};

export default MonthlySummary;