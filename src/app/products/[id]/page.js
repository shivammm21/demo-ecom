'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fallback
  const mockProducts = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, description: 'Experience pure audio fidelity with our flagship wireless headphones. Features active noise cancellation, 30-hour battery life, and plush memory foam earcups for all-day comfort. Perfect for audiophiles and travelers alike.', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Mechanical Keyboard', price: 149.50, description: 'Enhance your typing speed and tactile feedback with this premium mechanical keyboard. Features customizable RGB lighting, hot-swappable switches, and an aluminum frame for unmatched durability.', image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Minimalist Watch', price: 199.00, description: 'A timeless piece that combines elegant design with precise engineering. Features a scratch-resistant sapphire crystal, genuine leather strap, and water resistance up to 50 meters.', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
    { id: 4, name: 'Smart Home Speaker', price: 89.99, description: 'Control your smart home and enjoy room-filling sound with this intelligent speaker. Integrates seamlessly with your favorite voice assistants and streaming services.', image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66ea?q=80&w=600&auto=format&fit=crop' },
  ];

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.log('Using mock product details:', err.message);
        const mock = mockProducts.find(p => p.id.toString() === id);
        setProduct(mock || mockProducts[0]);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    alert('Added to cart!');
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', color: '#94a3b8' }}>Loading product details...</div>;
  }

  if (!product) {
    return <div className="container" style={{ padding: '4rem 0' }}>Product not found. <Link href="/" style={{ color: 'var(--primary)' }}>Go back</Link></div>;
  }

  return (
    <div className="container">
      <div className="detail-grid">
        <div className="detail-image-wrap">
          <img src={product.image_url || mockProducts[0].image_url} alt={product.name} />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          <p className="detail-desc">{product.description || 'A fantastic premium product to elevate your daily lifestyle. Crafted with high-quality materials and designed for longevity and performance.'}</p>
          
          <div className="flex gap-6" style={{ marginTop: '3rem' }}>
            <button className="btn btn-accent" style={{ flexGrow: 1, fontSize: '1.1rem', padding: '1rem' }} onClick={addToCart}>
              Add to Cart
            </button>
            <Link href="/" className="btn" style={{ padding: '1rem 2rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
