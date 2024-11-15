import express from 'express';
import {
  createEvent,
  getEventsByProjectId,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';

const router = express.Router();

// Yeni bir event oluştur
router.post('/events', createEvent);

// Belirli bir projeye ait event'leri getir
router.get('/projects/:projectId/events', getEventsByProjectId); // Projeye ait tüm etkinlikleri getir

// Diğer route'lar...
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
