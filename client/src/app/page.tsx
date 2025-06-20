import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1>家計簿アプリ</h1>
      <Link href="/add" className="text-blue-500 underline">
        ＋新規取引登録
      </Link>
    </main>
  );
}

