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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px' }}>
      <Image src="/logo.png" alt="360now Logo" width={200} height={50} />
      <h1 style={{ fontSize: '3rem', margin: '20px 0', color: 'var(--electric-green)' }}>Watch This Space</h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', marginBottom: '40px' }}>
        At 360now, we're disrupting feedback with bold, emotional insights that drive real growth. Stay tuned for a platform full of strength and personality – the perfect blend of professional edge and subtle irregularity.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '1rem' }}>Be one of the first to experience the revolution:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ width: '300px' }}
        />
        <button type="submit">Join the Waitlist</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {showPopup && (
        <div style={{ position: 'fixed', top: '20px', backgroundColor: 'var(--electric-green)', color: 'var(--lord-blue)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          Thank you for your interest! We'll be in touch soon with updates on 360now.
        </div>
      )}
    </div>
  );
}