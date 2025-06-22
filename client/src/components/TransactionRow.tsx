import React from 'react';
import Link from 'next/link';
import type { Transaction } from '@/types/Transaction';

type Props = {
  transaction: Transaction;
};

const TransactionRow: React.FC<Props> = ({ transaction }) => (
  <tr>
    <td className="border px-4 py-2">{transaction.date}</td>
    <td className="border px-4 py-2">
      <Link href={`/detail/${transaction.id}`} className="text-blue-600 underline">
        [{transaction.type === 'income' ? '収入' : '支出'}] {transaction.category}
      </Link>
    </td>
    <td
      className={`border px-4 py-2 ${
        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {transaction.amount.toLocaleString()} 円
    </td>
  </tr>
);

export default TransactionRow;
