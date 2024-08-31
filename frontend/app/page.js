'use client';

export default function Home() {

  const handleCheckout = async () => {

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
        currency: 'usd',
      }),
    });
    const session = await response.json();
    if (session.status === 'success') {
      window.location.href = session.url;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="bg-purple-600 p-3 rounded-lg text-white"
      onClick={handleCheckout}>
        Checkout
      </button>
    </main>
  );
}
