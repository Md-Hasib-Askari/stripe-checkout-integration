"use client";

import { useRouter } from "next/navigation";

export default function Cancel() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Payment cancelled!</h1>
      <p className="text-lg">You have cancelled the payment.</p>
      <button
        className="bg-purple-600 p-3 rounded-lg text-white"
        onClick={() => router.replace("/")}
      >
        Home
      </button>
    </main>
  );
}
