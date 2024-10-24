import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authReducer';

interface UseAuthFormProps {
  isLogin: boolean;
}

const useAuthForm = ({ isLogin }: UseAuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    surname,
    setSurname,
    message,
    isError,
    handleSubmit,
  };
};

export default useAuthForm;
