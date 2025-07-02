//型の定義

export type TransactionType = '収入' | '支出';

export interface Transaction {
  id: number;
  date: string; // ISO形式の日付文字列
  type: TransactionType;
  category: string;
  amount: number;
  note?: string | null;
}
