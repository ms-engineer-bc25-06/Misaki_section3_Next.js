// モックデータ
import type { Transaction } from "../types/Transaction";

export const transactions: Transaction[] = [
  { id: 1, date: '2025-06-01', type: 'income', category: '給与', amount: 300000, memo: '6月分給与' },
  { id: 2, date: '2025-06-05', type: 'expense', category: '食費', amount: 5000, memo: 'スーパー' },

];

export default transactions;