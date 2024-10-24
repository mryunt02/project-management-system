'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to the login page if no token is found
    } else {
      setIsAuthenticated(true); // Set authentication state to true if token is found
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    router.push('/login'); // Redirect to the login page
  };

  if (!isAuthenticated) {
    return; // Render nothing while checking authentication
  }

  return (
    <div>
      <h1>Here is my home page</h1>
      <button
        onClick={handleLogout}
        className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-400'
      >
        Log Out
      </button>
    </div>
  );
}
