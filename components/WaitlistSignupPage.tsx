import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import './WaitlistSignupPage.css'; // Assuming CSS for styles is here

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const WaitlistSignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [signups, setSignups] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await supabase.from('waitlist').insert([{ email }]);
      setEmail('');
    }
  };

  useEffect(() => {
    const fetchSignups = async () => {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact' });

      setSignups(count || 0);
    };

    fetchSignups();

    const subscription = supabase
      .from('waitlist')
      .on('INSERT', () => fetchSignups())
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const themeClass = useMemo(() => (theme === 'dark' ? 'dark-theme' : 'light-theme'), [theme]);

  return (
    <div className={`signup-container ${themeClass}`}> 
      <h1>Join the Waitlist</h1>
      <p>Current Sign-ups: {signups}</p>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default WaitlistSignupPage;
