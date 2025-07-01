import React from "react";
import Link from "next/link";
import type { Transaction } from "@/types/Transaction";

type Props = {
  transaction: Transaction;
};

const TransactionRow: React.FC<Props> = ({ transaction }) => {
  // Dateオブジェクトにして、日本語形式に変換
  const formattedDate = transaction.date.slice(0, 10);

  return (
    <tr>
      <td className="border px-4 py-2">{formattedDate}</td>
      <td className="border px-4 py-2">
        <Link
          href={`/detail/${transaction.id}`}
          className="text-blue-600 underline"
        >
          [{transaction.type}] {transaction.category}
        </Link>
      </td>
      <td
        className={`border px-4 py-2 ${
          transaction.type === "収入" ? "text-green-600" : "text-red-600"
        }`}
      >
        {transaction.amount.toLocaleString()} 円
      </td>
    </tr>
  );
};

export default TransactionRow;
