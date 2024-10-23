import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());
console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantısı başarısız', err));

// Rotaları kullan
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
