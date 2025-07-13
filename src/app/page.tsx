'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('waitlist').insert({ email });
    if (error) {
      setError('Something went wrong. Please try again.');
    } else {
      setShowPopup(true);
      setEmail('');
      setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5s
    }
  };

  return (
    <div className="container">
      <Image 
        src="/logo2.svg" 
        alt="360now Logo" 
        width={200} 
        height={50} 
        className="fade-in logo" 
        style={{ marginBottom: '20px' }} 
      />
      <h1 
        className="fade-in" 
        style={{ 
        fontSize: '3rem', 
        margin: '20px 0', 
        color: 'var(--electric-green)', 
        textShadow: '0 2px 4px rgba(65, 240, 188, 0.2)',
        textAlign: 'center' /* Add this for explicit centering */
  }}
>
  Watch This Space
</h1>
      <p 
        className="fade-in" 
        style={{ 
          fontSize: '1.2rem', 
          textAlign: 'center', 
          maxWidth: '600px', 
          marginBottom: '40px', 
          lineHeight: '1.6' 
        }}
      >
        At 360now, we&apos;re disrupting feedback with bold insights that drive real growth. Stay tuned for a platform full of strength and personality.
      </p>
      <form 
        onSubmit={handleSubmit} 
        className="fade-in" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '15px', 
          width: '100%', 
          maxWidth: '400px' 
        }}
      >
        <label style={{ fontSize: '1rem', fontFamily: 'var(--font-goldman)', textAlign: 'center' }}>
          Be one of the first to experience the revolution:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Join the Waitlist</button>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
      {showPopup && (
        <div className="popup">
          Thank you for your interest! We&apos;ll be in touch soon with updates on 360now.
        </div>
      )}
    </div>
  );
}