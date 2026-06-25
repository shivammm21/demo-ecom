'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setTotal(newCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>Your cart is currently empty.</p>
      ) : (
        <div className="grid gap-6" style={{ marginTop: '2rem' }}>
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center" style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-6">
                <div style={{ width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                  <img src={item.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{item.name}</h3>
                  <p style={{ color: '#94a3b8' }}>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600' }}>Remove</button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Total:</span>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-accent" onClick={() => alert('Checkout functionality needs to be implemented with your backend/payment provider!')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
