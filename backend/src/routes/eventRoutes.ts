import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getAllEvents,
  updateEvent,
} from '../controllers/eventController';

const router = Router();

router.post('/projects/:projectId/lists/:listId/events', createEvent);
router.get('/projects/:projectId/lists/:listId/events', getEvents);
router.get('/events', getAllEvents); // Add this line
router.put('/projects/:projectId/lists/:listId/events/:eventId', updateEvent);

export default router;
