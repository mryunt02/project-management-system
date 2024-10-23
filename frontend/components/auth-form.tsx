'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    // Check if the token exists in localStorage
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      router.push('/'); // Redirect to homepage if token exists
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? 'http://localhost:5001/api/login'
        : 'http://localhost:5001/api/register';
      const response = await axios.post(endpoint, {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setMessage(isLogin ? 'Giriş başarılı' : 'Kayıt başarılı');
      setIsError(false);
      router.push('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response);
        setMessage(error.response.data.message);
      } else {
        console.error('Unexpected error:', error);
        setMessage(
          isLogin
            ? 'Giriş sırasında bir hata oluştu.'
            : 'Kayıt sırasında bir hata oluştu.'
        );
      }
      setIsError(true);
    }
  };

  return (
    <div className='bg-blue-300 h-[100svh] flex items-center justify-center'>
      <div className='px-5 py-10 bg-white rounded-xl flex flex-col items-center gap-3 min-w-[500px]'>
        <div className='flex gap-2 self-baseline items-center'>
          <Link
            href='/login'
            className={
              currentPath === '/login'
                ? 'rounded bg-blue-300 px-4 py-2 text-white'
                : 'hover:underline'
            }
          >
            Login
          </Link>
          <Link
            href='/register'
            className={
              currentPath === '/register'
                ? 'rounded bg-blue-300 px-4 py-2 text-white'
                : 'hover:underline'
            }
          >
            Register
          </Link>
        </div>
        <h2 className='text-[40px]'>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
          <Input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit' className='bg-blue-300 hover:bg-blue-200'>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <p>
          {isLogin ? 'Not a member?' : 'Already a member?'}
          <Link
            href={isLogin ? '/register' : '/login'}
            className='text-slate-500'
          >
            {' '}
            {isLogin ? 'Sign up now.' : 'Login now.'}
          </Link>
        </p>
        {message && (
          <p className={isError ? 'text-red-600' : 'text-green-600'}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;