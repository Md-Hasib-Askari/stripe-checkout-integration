'use client';

import { useRouter } from "next/navigation";

export default function Success() {
    const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Payment successful!</h1>
      <p className="text-lg">Thank you for your purchase.</p>
      <button
        className="bg-purple-600 p-3 rounded-lg text-white"
        onClick={() => router.replace("/")}
      >
        Home
      </button>
    </main>
  );
}
