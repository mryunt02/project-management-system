import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authReducer';

const useAuthenticate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token) {
        router.push('/login'); // Redirect to the login page if no token is found
      } else {
        setIsAuthenticated(true); // Set authentication state to true if token is found
        if (storedUser) {
          const user = JSON.parse(storedUser);
          dispatch(login({ user, token }));
        }
      }
    }
  }, [router, dispatch]);

  return { isAuthenticated };
};

export default useAuthenticate;
