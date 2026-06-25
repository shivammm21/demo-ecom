'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data to use if Supabase fails or is not connected
  const mockProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Mechanical Keyboard', price: 149.50, image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Minimalist Watch', price: 199.00, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
    { id: 4, name: 'Smart Home Speaker', price: 89.99, image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66ea?q=80&w=600&auto=format&fit=crop' },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*').limit(8);
        if (error) throw error;
        setProducts(data?.length ? data : mockProducts);
      } catch (err) {
        console.log('Using mock products (Supabase not configured or table missing):', err.message);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Discover Premium Gear</h1>
          <p>Elevate your everyday life with our curated selection of high-quality electronics and accessories, designed for the modern professional.</p>
        </div>
      </section>

      <section className="container">
        <h2>Featured Products</h2>
        {loading ? (
          <p style={{ color: '#94a3b8', margin: '2rem 0' }}>Loading products...</p>
        ) : (
          <div className="grid product-grid">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image_url || mockProducts[0].image_url} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="btn" style={{ width: '100%', marginTop: 'auto' }}>View Details</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
