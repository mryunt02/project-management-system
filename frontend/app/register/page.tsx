'use client';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState(''); // Kullanıcı adı yerine e-posta
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Kayıt sırasında bir hata oluştu.');
      }
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-posta:</label> {/* Kullanıcı adı yerine e-posta */}
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Kayıt Ol</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
