import { Router } from 'express';
import {
  createEvent,
  getEvents,
  updateEvent,
} from '../controllers/eventController';

const router = Router();

router.post('/projects/:projectId/lists/:listId/events', createEvent);
router.get('/projects/:projectId/lists/:listId/events', getEvents);
router.put('/projects/:projectId/lists/:listId/events/:eventId', updateEvent);

export default router;
