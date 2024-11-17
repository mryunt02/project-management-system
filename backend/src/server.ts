import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import listRoutes from './routes/listRoutes';
import eventRoutes from './routes/eventRoutes';
import dotenv from 'dotenv';
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
app.use('/api', listRoutes); // Use list routes
app.use('/api', eventRoutes); // Use event routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
