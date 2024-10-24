import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Kayıt olma
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, confirmPassword, name, surname } = req.body;

  // Şifre doğrulama
  if (password !== confirmPassword) {
    console.log(password, confirmPassword);
    res.status(400).json({ message: 'Şifreler uyuşmuyor' });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ message: 'Şifre en az 8 karakter olmalıdır' });
    return;
  }

  // İsim ve soyisim doğrulama
  if (!name || !surname) {
    res.status(400).json({ message: 'İsim ve soyisim gerekli' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      surname,
    });
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    res.status(400).json({ message: 'Kullanıcı kaydı başarısız' });
    return;
  }
};

// Giriş yapma
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Kullanıcı bulunamazsa hata döndür
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Şifre geçerli değilse hata döndür
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
