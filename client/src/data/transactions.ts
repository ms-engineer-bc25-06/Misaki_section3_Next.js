// モックデータ
import type { Transaction } from "../types/Transaction";

export const transactions: Transaction[] = [
  { id: 1, date: '2025-06-01', type: '収入', category: '給与', amount: 300000, note: '6月分給与' },
  { id: 2, date: '2025-06-05', type: '支出', category: '食費', amount: 5000, note: 'スーパー' },

];

export default transactions;