'use client'

import Link from 'next/link'
import useSWR from 'swr'
import MonthlySummary from '@/components/MonthlySummary';
import FancyButton from '@/components/FancyButton'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data: transactions, error } = useSWR('http://localhost:4000/api/transactions', fetcher)

  if (error) return <div>読み込みエラーが発生しました</div>
  if (!transactions) return <div>読み込み中...</div>

  return (
   <main className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
  <h1 className="text-2xl font-bold mb-4">家計簿アプリ</h1>

  <MonthlySummary />

  <FancyButton href="/add">新規登録</FancyButton>
  <FancyButton href="/list">入出金一覧</FancyButton>
</main>

  )
}

