'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authReducer';
import loginImage from '../images/frontImg.jpg';
import backImage from '../images/backImg.jpg';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    try {
      const endpoint = isLogin
        ? 'http://localhost:5001/api/login'
        : 'http://localhost:5001/api/register';
      const response = await axios.post(endpoint, {
        email,
        password,
        confirmPassword,
        name: isLogin ? undefined : name,
        surname: isLogin ? undefined : surname,
      });
      const user = { email, name, surname };
      dispatch(login({ user, token: response.data.token }));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
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
    <div className='bg-blue-400 h-[100svh] flex items-center justify-center'>
      <div
        className={`px-5 py-10 bg-white flex flex-col items-center gap-3 w-[425px] h-[451px] ${
          !isLogin ? 'order-2' : 'order-0'
        }`}
      >
        <h2 className='text-[40px] self-baseline'>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
          {!isLogin && (
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type='text'
                placeholder='Surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          )}
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
          {!isLogin && (
            <Input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <Button type='submit' className='bg-blue-400 hover:bg-blue-300'>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <p>
          {isLogin ? 'Not a member?' : 'Already a member?'}
          <Link
            href={isLogin ? '/register' : '/login'}
            className='text-blue-400'
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
        {isLogin && (
          <div className='mt-2'>
            <p className='text-center'>Share us!</p>
            <div className='flex gap-2'>
              <Instagram stroke='#60a5fa' />
              <Twitter stroke='#60a5fa' />
              <Linkedin stroke='#60a5fa' />
              <Facebook stroke='#60a5fa' />
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='relative opacity-50'>
          <Image
            src={isLogin ? loginImage : backImage}
            alt='Login'
            className='w-[425px] h-[451px]'
          />
        </div>
        <div className='absolute top-[40%] w-[365px] flex flex-col text-white ml-[60px]'>
          <span className='text-[40px]'>Manage your projects,</span>{' '}
          <span className=''>with no effort.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
