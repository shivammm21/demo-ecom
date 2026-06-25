'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--accent)', padding: '4rem 2rem', borderRadius: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ background: 'none', WebkitTextFillColor: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>Success!</h1>
        <p style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '1rem' }}>Thank you for your order.</p>
        {orderId && (
          <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>
            Your Order ID is: <strong style={{ color: '#fff' }}>#{orderId}</strong>
          </p>
        )}
        <Link href="/" className="btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
