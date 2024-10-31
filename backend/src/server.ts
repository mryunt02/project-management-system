// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes'; // Import project routes
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantısı başarısız', err));

// Rotaları kullan
app.use('/api', authRoutes);
app.use('/api', projectRoutes); // Use project routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
