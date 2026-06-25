'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // In a real app, you'd use a global store (Zustand, Context) for cart state.
  // For simplicity, we'll listen to a custom event or check localStorage.
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };
    
    updateCart();
    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link href="/" className="logo">
          Antigravity E-com
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="btn btn-accent">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}
